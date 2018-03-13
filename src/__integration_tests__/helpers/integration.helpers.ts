import * as  prompt from 'prompt';
import * as path from 'path';

export async function readLine(stringPrompt: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		prompt.start();
		prompt.get([stringPrompt], function(err: Error, result: any) {
			resolve(result[stringPrompt]);
		});
	});
}

export function getPrivateConfig() {

	try {
		const config = require('../private-config.json');
		return config;

	} catch (error) {
		// Using ENV VARS in CircleCI
		return {
			AppType: 'partner',
			ConsumerKey: process.env.ConsumerKey,
			ConsumerSecret: process.env.ConsumerSecret,
			CallbackBaseUrl: null,
			PrivateKeyCert: path.resolve(__dirname, '.', 'privatekey.pem')
		};
	}
}

export function getLoginConfig() {
	try {
		const config = require('../password-config.json');
		return config;

	} catch (error) {
		// Using ENV VARS in CircleCI
		return {
			userName: process.env.UserName,
			password: process.env.Password
		};
	}
	
}

export function getPartnerAppConfig() {
	const config = require('../partner-config-example.json');
	if(config.ConsumerKey == 'key' || config.ConsumerSecret == 'secret') {
		// Using ENV VARS in CircleCI
		return {
			AppType: 'partner',
			ConsumerKey: process.env.ConsumerKey,
			ConsumerSecret: process.env.ConsumerSecret,
			CallbackBaseUrl: null,
			PrivateKeyCert: path.resolve(__dirname, '.', 'privatekey.pem')
		};
	}
	return config;
}

export function setJestTimeout() {
	if (jest) {
		jest.setTimeout(60000);
	}
}