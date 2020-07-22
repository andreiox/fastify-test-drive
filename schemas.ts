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
