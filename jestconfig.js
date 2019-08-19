const path = require('path');

let jestConfig = {
	"preset": "jest-puppeteer",
	"rootDir": ".",
	"transform": {
		"^.+\\.tsx?$": "ts-jest"
	},
	"testMatch": [
		"<rootDir>/src/**/__tests__/**/*tests.(ts|tsx)",
		"<rootDir>/src/**/__integration_tests__/**/*tests.(ts|tsx)"
	],
	"moduleFileExtensions": [
		"ts",
		"tsx",
		"js",
		"json"
	],
	"moduleNameMapper": {
		"^.+\\.(css|less|scss)$": "identity-obj-proxy"
	},
	"snapshotSerializers": []
}

let customConfigPath = path.join('jestconfig.js');
try {
	let config = require(customConfigPath);
	console.log('Using customised Jest config from jestconfig.js');
	config(jestConfig, 'local');
}
catch (e) {}

module.exports = jestConfig;
