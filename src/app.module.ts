import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AsyncStorageMiddleware } from './middleware/async-storage/async-storage.middleware';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { DeployModule } from './modules/deploy/deploy.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		ConfigModule.forRoot({ load: [config] }),

		UserModule,
		DeployModule,
		DatabaseModule
	],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AsyncStorageMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
	}
}
