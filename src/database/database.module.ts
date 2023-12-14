import { Global, Module } from '@nestjs/common';
import { MysqlProvider, RedisProvider } from './databas.provider';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
	imports: [ConfigModule],
	providers: [MysqlProvider, RedisProvider],
	exports: [MysqlProvider, RedisProvider],
})
export class DatabaseModule {}
