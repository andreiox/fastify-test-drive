export default {
	routePrefix: '/documentation',
	exposeRoute: true,
	swagger: {
		info: {
			title: 'Fastify Test Drive Documentation',
			description: 'Taking fastfiy for a spin!',
			version: '1.0.0',
		},
		externalDocs: {
			url: 'https://swagger.io',
			description: 'Find more info here',
		},
		host: 'localhost:3000',
		schemes: ['http'],
		consumes: ['application/json'],
		produces: ['application/json'],
	},
};
