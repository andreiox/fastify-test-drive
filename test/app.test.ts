import test from 'ava';

import build from '../src/app';

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

test('POST "/body-validation" should return 200 for valid body', async t => {
	const app = build();

	const payload = { username: 'andreiox', age: 24 };
	const response = await app.inject({
		method: 'POST',
		url: '/body-validation',
		payload,
	});

	t.is(response.statusCode, 200);
	t.is(response.body, JSON.stringify(payload));
});

test('POST "/body-validation" should return 400 for invalid body', async t => {
	const app = build();

	const payload = { username: 'andreiox', age: 'a' };
	const response = await app.inject({
		method: 'POST',
		url: '/body-validation',
		payload,
	});

	t.is(response.statusCode, 400);
	t.is(response.json().message, 'body.age should be number');
});

test('POST "/body-validation" should return 400 and multiple error in body', async t => {
	const app = build({ ajv: { customOptions: { allErrors: true } } });

	const payload = { age: 'a' };
	const response = await app.inject({
		method: 'POST',
		url: '/body-validation',
		payload,
	});
	const expected =
		"body should have required property 'username', body.age should be number";

	t.is(response.statusCode, 400);
	t.is(response.json().message, expected);
});

test('GET "/header-validation" should validate header', async t => {
	const app = build();

	const response = await app.inject({
		method: 'GET',
		url: '/header-validation',
		headers: {
			'super-important-header': 'this is important',
		},
	});
	const expected = 'this is important';

	t.is(response.statusCode, 200);
	t.is(response.body, expected);
});

test('GET "/header-validation" should return 400 for invalid header', async t => {
	const app = build();

	const response = await app.inject({ method: 'GET', url: '/header-validation' });
	const expected =
		"headers should have required property 'super-important-header'";

	t.is(response.statusCode, 400);
	t.is(response.json().message, expected);
});

test('GET "/query-validation" should validate query param', async t => {
	const app = build();

	const response = await app.inject({
		method: 'GET',
		url: '/query-validation',
		query: { param1: 'value1' },
	});
	const expected = { param1: 'value1' };

	t.is(response.statusCode, 200);
	t.deepEqual(response.json(), expected);
});

test('GET "/query-validation" should return 400 for invalid query param', async t => {
	const app = build();

	const response = await app.inject({ method: 'GET', url: '/query-validation' });
	const expected = "querystring should have required property 'param1'";

	t.is(response.statusCode, 400);
	t.is(response.json().message, expected);
});

test('POST "/response-schema" should return request body values based on schema', async t => {
	const app = build();

	const payload = { value1: 'string', value2: true, value3: 'hello' };
	const response = await app.inject({
		method: 'POST',
		url: '/response-schema',
		payload,
	});

	const expected = { ...payload };
	delete expected.value3;

	t.is(response.statusCode, 200);
	t.deepEqual(response.json(), expected);
});

test('GET "/with-error" should lower case the error message', async t => {
	const app = build();

	const response = await app.inject({ method: 'GET', url: '/with-error' });
	const expected = 'hello error!';

	t.is(response.statusCode, 500);
	t.is(response.body, expected);
});
