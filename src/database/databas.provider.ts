import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";

const logger = new Logger('databaseProvider');

export const databaseProvider = {
	inject: [ConfigService],
	provide: "MYSQL_CONNECTION",
	useFactory: async (configService: ConfigService) => {
		const uri = configService.get('databaseUrl') || process.env.DB_URL;

		logger.log(`连接mysql ${uri}`);
		return {
			type: 'mysql',
			// host: configService.get('HOST'),
			// port: +configService.get('PORT'),
			// username: configService.get('USERNAME'),
			// password: configService.get('PASSWORD'),
			// database: configService.get('DATABASE'),
			url: uri,
			entities: [],
			synchronize: true,
		}
	},
}
