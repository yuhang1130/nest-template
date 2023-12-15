import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { CustomException } from '../../exceptions/custom.exception';
import { ErrorCode } from '../../constants/errorCode-constant';
import crypto from 'bcrypt';
import * as _ from 'lodash';
import { Mysql } from '../../database/msyql';

@Injectable()
export class UserService {
	constructor(
		readonly configService: ConfigService,
		readonly mysql: Mysql,
	) {}

	async register(data: CreateUserDto): Promise<UserEntity> {
		const existUser = await this.mysql.findOne(UserEntity, {
			where: {
				user_name: data.user_name,
			},
		});
		if (existUser) {
			throw new CustomException(ErrorCode.UserExisted);
		}

		const salt = crypto.genSaltSync(12);
		console.log('salt-----', salt);
		data.pass_word = crypto.hashSync(data.pass_word, salt);
		const userData = _.pick(data, ['user_name', 'pass_word', 'phone', 'email']);
		const newUser = await this.mysql.create(UserEntity, { ...userData, salt });

		await this.mysql.save(newUser);
		return _.omit(newUser, 'pass_word') as UserEntity;
	}

	async create(data: CreateUserDto): Promise<boolean> {
		console.log('configService-------', this.configService);

		return true;
	}

	findAll() {
		return `This action returns all user`;
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(data: any) {
		return `This action updates  user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
