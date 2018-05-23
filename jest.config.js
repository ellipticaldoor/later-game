const { COVERAGE } = process.env

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

if (COVERAGE === 'all') {
	jestConfig.collectCoverageFrom = ['src/**/*.js', 'src/**/*.ts']
}

module.exports = jestConfig
