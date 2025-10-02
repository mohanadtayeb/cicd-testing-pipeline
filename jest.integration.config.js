export default {
	testEnvironment: 'node',
	testMatch: ['**/tests/integration/**/*.test.js'],
	setupFilesAfterEnv: ['<rootDir>/tests/integration/setup.js'],
	collectCoverageFrom: [
		'src/**/*.{js,svelte}',
		'!src/**/*.test.js',
		'!src/**/*.spec.js'
	],
	coverageDirectory: 'coverage/integration',
	coverageReporters: ['text', 'json', 'html', 'lcov'],
	transform: {
		'^.+\\.js$': 'babel-jest'
	}
};