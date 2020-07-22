import fastify from 'fastify';

const userSchema = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		age: { type: 'number' },
	},
	required: ['username', 'age'],
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

	return app;
};
