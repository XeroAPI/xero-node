import * as path from 'path';

export function getConfig() {
	try {
		const config = require('./config.json');
		return config;

	} catch (error) {
		// Using ENV VARS in CircleCI
		return {
			AppType: 'private',
			ConsumerKey: process.env.ConsumerKey,
			ConsumerSecret: process.env.ConsumerSecret,
			CallbackBaseUrl: null,
			UserAgent: 'Tester',
			PrivateKeyCert: path.resolve(__dirname, '.', 'privatekey.pem')
		};
	}
}
