import fastify from 'fastify';

const userSchema = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		age: { type: 'number' },
	},
	required: ['username', 'age'],
};

const headerSchema = {
	type: 'object',
	properties: {
		'super-important-header': {
			type: 'string',
		},
	},
	required: ['super-important-header'],
};

export default (opts = {}) => {
	const app = fastify(opts);

	app.get('/', async (req, res) => {
		return { hello: 'world' };
	});

	app.post('/', async (req, res) => {
		return req.body;
	});

	app.post(
		'/body-validation',
		{ schema: { body: userSchema } },
		async (req, res) => {
			return req.body;
		},
	);

	app.get(
		'/header-validation',
		{ schema: { headers: headerSchema } },
		async (req, res) => {
			return req.headers['super-important-header'];
		},
	);

	return app;
};
