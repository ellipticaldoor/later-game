module.exports = {
	globals: { module: true },
	env: {
		browser: true,
		es6: true,
	},
	extends: 'standard',
	parserOptions: {
		sourceType: 'module',
	},
	rules: {
		'arrow-parens': 0,
		'generator-star-spacing': 0,
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'no-tabs': 0,
		indent: ['error', 'tab'],
		'space-before-function-paren': 0,
		'comma-dangle': 1,
		camelcase: 0,
		'no-unused-vars': 1,
		eqeqeq: 0,
		'no-console': [1, { allow: ['warn', 'error'] }],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'ignore',
			},
		],
	},
}
