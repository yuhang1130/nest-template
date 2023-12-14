import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { RedisProvider } from '../../database/databas.provider';

const Session = (SessionName: string) => {
	const store = new RedisStore({
		client: RedisProvider,
		prefix: 'session:',
	});

	return session({
		resave: false,
		saveUninitialized: false,
		secret: 'nest_web',
		name: SessionName,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // 24 hours
		},
		store,
	});
};
export default Session;
