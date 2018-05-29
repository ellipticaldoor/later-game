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
	coveragePathIgnorePatterns: ['.*\\.d\\.ts', '<rootDir>/node_modules/'],
}

if (process.env.COVERAGE === 'all') {
	jestConfig.collectCoverageFrom = ['src/**/*.js', 'src/**/*.ts']
}

module.exports = jestConfig
