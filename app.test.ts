import test from 'ava';

import build from './app';

test('should respond hello world in root', async t => {
	const app = build();

	const response = await app.inject({ method: 'GET', url: '/' });
	const expected = JSON.stringify({ hello: 'world' });

	t.is(response.statusCode, 200);
	t.is(response.body, expected);
});
