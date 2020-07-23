import fastify from 'fastify';

import * as schemas from './schemas';

export default (opts = {}) => {
	const app = fastify(opts);

	app.setErrorHandler((err, req, res) => {
		if (err.validation) return res.status(400).send(err);

		return res.status(500).send(err.message.toLowerCase());
	});

	app.get('/', async (req, res) => {
		return { hello: 'world' };
	});

	app.post('/', async (req, res) => {
		return req.body;
	});

	app.post(
		'/body-validation',
		{ schema: { body: schemas.userSchema } },
		async (req, res) => {
			return req.body;
		},
	);

	app.get(
		'/header-validation',
		{ schema: { headers: schemas.headerSchema } },
		async (req, res) => {
			return req.headers['super-important-header'];
		},
	);

	app.get(
		'/query-validation',
		{ schema: { querystring: schemas.querySchema } },
		async (req, res) => {
			return req.query;
		},
	);

	app.post(
		'/response-schema',
		{ schema: { response: schemas.responseSchema } },
		async (req, res) => {
			return req.body;
		},
	);

	app.get('/with-error', async (req, res) => {
		throw Error('Hello Error!');
	});

	return app;
};
