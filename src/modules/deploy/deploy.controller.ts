import { Controller, Get, Inject, Logger, ServiceUnavailableException } from "@nestjs/common";
import { Redis } from 'ioredis';


const MAX_FAIL_HEALTH = 10;

class TypeOrmHealthIndicator {
}

@Controller('deploy')
export class DeployController {
	logger = new Logger(DeployController.name);
	mongoFail = 0;
	redisFail = 0;
	// constructor(
	// 	readonly originMongo: any,
	// 	@Inject('REDIS_CLIENT_PING') readonly redisClient: Redis,
	// ) {
	// 	setInterval(this.mongoHealthCheck.bind(this), 5e3);
	// 	setInterval(this.redisHealCheck.bind(this), 5e3);
	// }

	// async mongoHealthCheck() {
	// 	const timeout = new Promise(ok => {
	// 		setTimeout(() => {
	// 			ok({ok: false});
	// 		}, 3e3);
	// 	});
	// 	const mongoCheck = await Promise.race([
	// 		this.originMongo.ping(),
	// 		timeout,
	// 	]).catch(e => {
	// 		this.logger.warn(`OriginMongo check error: ${e.message || JSON.stringify(e?.stack)}`, );
	// 		return {ok: false};
	// 	}) as any;
	//
	// 	if (mongoCheck?.ok) {
	// 		this.mongoFail = 0;
	// 	}
	// 	else {
	// 		this.mongoFail ++;
	// 		this.logger.warn(`MongoPing fail, count: ${this.mongoFail}`, );
	// 		if (this.mongoFail > MAX_FAIL_HEALTH) {
	// 			process.exit(1001);
	// 		}
	// 	}
	// }

	// async redisHealCheck() {
	// 	const timeout = new Promise(ok => {
	// 		setTimeout(() => {
	// 			ok({ok: false});
	// 		}, 3e3);
	// 	});
	// 	const redisCheck = await Promise.race([
	// 		timeout,
	// 		this.redisPing(),
	// 	]).catch(e => {
	// 		this.logger.warn(`Redis check error: ${e.message || JSON.stringify(e?.stack)}`);
	// 	}) as any;
	//
	// 	if (redisCheck?.ok) {
	// 		this.redisFail = 0;
	// 	} else {
	// 		this.redisFail ++;
	// 		this.logger.warn(`Redis fail count: ${this.redisFail}`);
	// 		if (this.redisFail > MAX_FAIL_HEALTH) {
	// 			process.exit(1002);
	// 		}
	// 	}
	// }

	// private async redisPing() {
	// 	const result = await this.redisClient.ping();
	// 	return new Promise(ok => {
	// 		ok({ok: result === 'PONG'});
	// 	});
	// }

	@Get(['ready', 'live'])
	async readyLive(): Promise<string> {
		if (this.mongoFail > MAX_FAIL_HEALTH) {
			throw new ServiceUnavailableException('MongoUnHealthy');
		}
		if (this.redisFail > MAX_FAIL_HEALTH) {
			throw new ServiceUnavailableException('RedisUnHealthy');
		}
		return 'success';
	}
}
