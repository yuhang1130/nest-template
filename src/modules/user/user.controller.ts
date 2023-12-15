import { Controller, Post, Body, SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsAdmin } from '../../constants/user-constant';
import { AuthGuard } from '../../auth/auth.guard';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('create')
	async register(@Body() data: CreateUserDto): Promise<UserEntity> {
		return await this.userService.register(data);
	}

	@SetMetadata(IsAdmin, true)
	@UseGuards(AuthGuard)
	@Post('create')
	async create(@Body() data: CreateUserDto): Promise<boolean> {
		return await this.userService.create(data);
	}

	@SetMetadata(IsAdmin, true)
	@UseGuards(AuthGuard)
	@Post('find')
	async find(@Body() data: any) {
		return this.userService.findOne(data);
	}

	@SetMetadata(IsAdmin, true)
	@UseGuards(AuthGuard)
	@Post('update')
	update(@Body() data: UpdateUserDto) {
		return this.userService.update(data);
	}

	@SetMetadata(IsAdmin, true)
	@UseGuards(AuthGuard)
	@Post('delete')
	remove(@Body() data: any) {
		return this.userService.remove(data);
	}
}
