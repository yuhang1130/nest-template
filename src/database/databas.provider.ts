import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { isLocal } from '../config';
import { Redis } from 'ioredis';
import { createConnection } from 'mysql2';


const logger = new Logger('databaseProvider');

export const DatabaseProvider = {
	inject: [ConfigService],
	provide: 'MYSQL_CONNECTION',
	useFactory: (config: ConfigService) => {
		try {
			const uri = config.get('databaseUrl') || process.env.DB_URL;
			logger.log(`连接mysql: ${uri}`);
			const conn = createConnection(uri);
			conn.on('error', (e) => {
				logger.error(`Mysql Connect Error: ${JSON.stringify(e)}`);
			})
			conn.on('connect', () => {
				logger.log(`Mysql Connect Success`);
			})
			return conn;
		}
		catch (e) {
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
			const urls = config.get('redis.url');
			logger.log(`连接redis: ${urls}`);
			// const password = config.get('redis.password');
			// const db = config.get('redis.db') || 0;
			if (_.isString(urls)) {
				const redis = new Redis(urls);
				redis.on('error', (e) => {
					logger.error(`Redis Error: ${JSON.stringify(e)}`);
				});
				redis.on('connect', () => {
					logger.log(`Redis Connect Success`);
				});
				return redis;
			} else if (_.isArray(urls)) {
				const cluster = new Redis.Cluster(urls, {
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
		}
		catch (e) {
			logger.error('Redis Connect Error: ' + e?.message);
		}
		return null;
	},
};
