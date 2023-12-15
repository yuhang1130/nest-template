import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserService, ConfigService],
	exports: [UserService],
})
export class UserModule {}
