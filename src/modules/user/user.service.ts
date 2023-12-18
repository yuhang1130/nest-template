import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginResultDto, LoginUserDto, SessionDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { CustomException } from '../../exceptions/custom.exception';
import { ErrorCode } from '../../constants/errorCode-constant';
import * as crypto from 'bcrypt';
import * as _ from 'lodash';
import { Mysql } from '../../database/msyql';
import { ENTITY_STATUS } from '../../constants/entities-constant';
import { AlsGetRequest } from '../../async-storage/async-storage';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class UserService {
	constructor(
		readonly configService: ConfigService,
		readonly auth: AuthService,
		readonly mysql: Mysql,
	) {}

	async register(data: CreateUserDto): Promise<UserEntity> {
		const existUser = await this.getUserByName(data.user_name);
		console.log('existUser-----', existUser, existUser.create_time.valueOf());
		if (existUser) {
			throw new CustomException(ErrorCode.UserExisted);
		}

		const salt = crypto.genSaltSync(12);
		data.pass_word = crypto.hashSync(data.pass_word, salt);
		const userData = _.pick(data, ['user_name', 'pass_word', 'phone', 'email']);
		const newUser = await this.mysql.create(UserEntity, { ...userData, salt });

		await this.mysql.save(newUser);
		return _.omit(newUser, ['pass_word', 'salt']) as UserEntity;
	}

	async login(data: LoginUserDto): Promise<LoginResultDto> {
		const existUser = await this.getUserByName(data.user_name);
		if (!existUser) {
			throw new CustomException(ErrorCode.UserNotExist);
		}

		const match = crypto.compareSync(data.pass_word, existUser.pass_word);
		console.log('match-----', match);
		if (!match) {
			throw new CustomException(ErrorCode.UserOrPsw);
		}
		if (existUser.status !== ENTITY_STATUS.NORMAL || existUser.is_deleted) {
			throw new CustomException(ErrorCode.UserUnavailable);
		}
		const UserSession: SessionDto = {
			UserId: existUser.id,
			OpUserId: existUser.id,
			Rights: [],
		};
		console.log('AlsGetRequest().session----', AlsGetRequest().session);
		AlsGetRequest().session['data'] = UserSession;
		AlsGetRequest().session.save();

		console.log('AlsGetRequest().sessionID----', AlsGetRequest().sessionID);
		const result: LoginResultDto = new LoginResultDto();
		result.token = this.auth.signIn({ id: AlsGetRequest().sessionID });

		return result;
	}

	async getUserByName(name: string): Promise<UserEntity> {
		return await this.mysql.findOne(UserEntity, {
			where: {
				user_name: name,
			},
		});
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
