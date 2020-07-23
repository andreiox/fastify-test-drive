export const userSchema = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		age: { type: 'number' },
	},
	required: ['username', 'age'],
};

export const headerSchema = {
	type: 'object',
	properties: {
		'super-important-header': {
			type: 'string',
		},
	},
	required: ['super-important-header'],
};

export const querySchema = {
	type: 'object',
	properties: {
		param1: { type: 'string' },
	},
	required: ['param1'],
};

export const responseSchema = {
	200: {
		type: 'object',
		properties: {
			value1: { type: 'string' },
			value2: { type: 'boolean' },
		},
	},
};
