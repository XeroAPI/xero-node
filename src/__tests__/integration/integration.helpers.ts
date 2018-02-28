import * as path from 'path';

export function getConfig(){
	try {
		const data = require('./config.json');
		return { ...data, ...{ PrivateKeyCert: path.resolve(__dirname, '..', '..', '..', 'privatekey.pem') } };

	} catch (error) {
		return {
			AppType: 'private',
			ConsumerKey: process.env.ConsumerKey,
			ConsumerSecret: process.env.ConsumerSecret,
			CallbackBaseUrl: null,
			UserAgent: 'Tester'
		};
	}
}
