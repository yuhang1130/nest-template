import { Global, Module } from '@nestjs/common';
import { MysqlProvider, RedisProvider } from './databas.provider';
import { ConfigModule } from '@nestjs/config';
import { Mysql } from './msyql';

@Global()
@Module({
	imports: [ConfigModule],
	providers: [MysqlProvider, RedisProvider, Mysql],
	exports: [MysqlProvider, RedisProvider, Mysql],
})
export class DatabaseModule {}
