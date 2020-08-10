import dotenv from 'dotenv';

import buildApp from './app';

dotenv.config();

const server = buildApp({
	logger: {
		level: 'info',
		prettyPrint: true,
	},
});

const port = +process.env.PORT! || 3000;

server.listen(port, '0.0.0.0', (err, address) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});
