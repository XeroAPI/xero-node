const path = require('path');

let jestConfig = {
	"rootDir": ".",
	"transform": {
		".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
	},
	"testMatch": [
		"<rootDir>/src/**/__tests__/**/*tests.(ts|tsx)",
		"<rootDir>/src/**/__integration_tests__/**/*tests.(ts|tsx)"
	],
	"moduleFileExtensions": [
		"ts",
		"tsx",
		"js"
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
