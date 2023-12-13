import { Global, Module } from '@nestjs/common';
import { DatabaseProvider, RedisProvider } from './databas.provider';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
	imports: [ConfigModule],
	providers: [DatabaseProvider, RedisProvider],
	exports: [DatabaseProvider, RedisProvider],
})
export class DatabaseModule {}
