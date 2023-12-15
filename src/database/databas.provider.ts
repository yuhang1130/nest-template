import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { isLocal } from '../config';
import { Redis } from 'ioredis';
import { createConnection } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

const logger = new Logger('databaseProvider');

export const MysqlProvider = {
	inject: [ConfigService],
	provide: 'MYSQL_CONNECTION',
	useFactory: async (config: ConfigService) => {
		try {
			const mysqlConf = config.get('mysql', {});
			const connectConf: DataSourceOptions = {
				...mysqlConf,
				type: 'mysql',
				entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
				synchronize: isLocal,
			};
			logger.log(`连接mysql: ${JSON.stringify(connectConf)}`);
			const conn = await createConnection(connectConf);
			if (conn.isConnected) {
				logger.log(`MYSQL Connect Success`);
			} else {
				logger.error(`MYSQL Connect Error`);
			}
			return conn;
		} catch (e) {
			logger.error('Mongo Connect Error: ' + e.message);
		}

		return null;

		// const uri = config.get('databaseUrl') || process.env.DB_URL;
		// logger.log(`连接mysql: ${uri}`);
		// return {
		// 	type: 'mysql',
		// 	// host: configService.get('HOST'),
		// 	// port: +configService.get('PORT'),
		// 	// username: configService.get('USERNAME'),
		// 	// password: configService.get('PASSWORD'),
		// 	// database: configService.get('DATABASE'),
		// 	url: uri,
		// 	// [__dirname + '/**/**/*.entity{.ts,.js}']
		// 	entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
		// 	synchronize: isLocal,
		// };
	},
};

export const RedisProvider = {
	inject: [ConfigService],
	provide: 'REDIS_CONNECTION',
	useFactory: (config: ConfigService) => {
		try {
			const redisConfs = config.get('redis');
			logger.log(`连接redis: ${JSON.stringify(redisConfs)}`);
			if (_.isArray(redisConfs)) {
				const cluster = new Redis.Cluster(redisConfs, {
					enableReadyCheck: true,
					enableOfflineQueue: false,
				});
				cluster.on('error', (e) => {
					logger.error(`Redis Cluster Error: ${JSON.stringify(e)}`);
				});
				cluster.on('connect', () => {
					logger.log(`Redis Cluster Connect Success`);
				});
				return cluster;
			}
			const redis = new Redis(redisConfs);
			redis.on('error', (e) => {
				logger.error(`Redis Error: ${JSON.stringify(e)}`);
			});
			redis.on('connect', () => {
				logger.log(`Redis Connect Success`);
			});
			return redis;
		} catch (e) {
			logger.error('Redis Connect Error: ' + e?.message);
		}
		return null;
	},
};
