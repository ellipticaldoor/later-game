const jestConfig = {
	moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
	globals: {
		'ts-jest': {
			useBabelrc: true,
		},
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.jsx?$': 'babel-jest',
	},
	moduleNameMapper: {
		'.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
			'identity-obj-proxy',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	coveragePathIgnorePatterns: ['.*\\.d\\.ts', '<rootDir>/node_modules/'],
}

if (process.env.COVERAGE === 'all') {
	jestConfig.collectCoverageFrom = ['src/**/*.js', 'src/**/*.ts']
}

module.exports = jestConfig
