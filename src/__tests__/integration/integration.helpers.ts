import * as path from 'path';

export function getConfig() {
	// jest.setTimeout(20000);

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
			PrivateKeyCert: path.resolve(__dirname, '.', 'privatekey.pem')
		};
	}
}
