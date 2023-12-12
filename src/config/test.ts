export default () => ({
  env: process.env.DEPLOY_ENV || 'test',
  port: process.env.PORT || 9090,
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      'a-M_wEK8HTiuoyVUmij9EMu@XjdpaccnvaC.fcbqhFe9D!TK-n.a77xkDuRx@myydrkT7EXvdCjLnWcUsY*JY4BJbPPR.gFLEedv',
    expire: 24 * 60 * 60, // 单位秒
    // expire: 2, // 单位秒
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PWD,
    db: process.env.REDIS_DB || 0,
  },
  databaseUrl: process.env.DB_URL || 'mysql://root:123456@localhost:3306/hh',
  kafka: {
    enable: process.env.KAFKA_ENABLE || '0',
    brokers: process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:29092',
    topic: process.env.KAFKA_WECHAT_MESSAGE_TOPIC || 'wechat_message_topic_dev',
  },
});
