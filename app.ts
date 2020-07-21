import fastify from 'fastify';

export default (opts = {}) => {
	const app = fastify(opts);

	app.get('/', async function (req, res) {
		return { hello: 'world' };
	});

	return app;
};
