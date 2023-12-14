export default () => ({
	env: process.env.DEPLOY_ENV || 'local',
	port: process.env.PORT || 9090,
	jwt: {
		secret:
			process.env.JWT_SECRET ||
			'a-M_wEK8HTiuoyVUmij9EMu@XjdpaccnvaC.fcbqhFe9D!TK-n.a77xkDuRx@myydrkT7EXvdCjLnWcUsY*JY4BJbPPR.gFLEedv',
		expire: 24 * 60 * 60, // 单位秒
		// expire: 2, // 单位秒
	},
	redis: {
		host: process.env.REDIS_HOST || 'localhost',
		port: process.env.REDIS_PORT || 6379,
		password: process.env.REDIS_PWD || '',
		db: process.env.REDIS_DB || 0,
	},
	mysql: {
		host: process.env.MYSQL_HOST || 'localhost',
		port: process.env.MYSQL_PORT || 3306,
		user: process.env.MYSQL_USER || 'root',
		password: process.env.MYSQL_PWD || 'mysql123',
		database: process.env.MYSQL_DB || 'hh',
	},
});
