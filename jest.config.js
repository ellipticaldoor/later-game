const jestConfig = {
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	globals: {
		'ts-jest': {
			useBabelrc: true,
		},
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.jsx?$': 'babel-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
}

if (process.env.COVERAGE === 'all') {
	jestConfig.collectCoverageFrom = ['client/**/*.js', 'client/**/*.ts']
}

module.exports = jestConfig
