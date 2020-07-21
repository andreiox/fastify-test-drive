import test from 'ava';

import build from './app';

test('GET "/" should return hello world', async t => {
	const app = build();

	const response = await app.inject({ method: 'GET', url: '/' });
	const expected = JSON.stringify({ hello: 'world' });

	t.is(response.statusCode, 200);
	t.is(response.body, expected);
});

test('POST "/" should return request body', async t => {
	const app = build();

	const payload = { fastify: 'inject is great' };
	const response = await app.inject({ method: 'POST', url: '/', payload });

	t.is(response.statusCode, 200);
	t.is(response.body, JSON.stringify(payload));
});
