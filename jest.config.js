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
	// Update to jest 23 to enable this when this bug is fixed:
	// https://github.com/jest-community/vscode-jest/issues/316
	// watchPlugins: [
	// 	'jest-watch-typeahead/filename',
	// 	'jest-watch-typeahead/testname',
	// ],
}

if (process.env.COVERAGE === 'all') {
	jestConfig.collectCoverageFrom = ['src/**/*.js', 'src/**/*.ts']
}

module.exports = jestConfig
