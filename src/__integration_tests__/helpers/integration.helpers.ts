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
	if (!process.env.CI) {
		const config = require('../private-config.json');
		return config;
	} else {
		return {
			AppType: 'private',
			ConsumerKey: process.env.ConsumerKey,
			ConsumerSecret: process.env.ConsumerSecret,
			CallbackBaseUrl: null,
			PrivateKeyCert: path.resolve(__dirname, '.', 'privatekey.pem')
		};
	}
}

export function getLoginConfig() {
	if (!process.env.CI) {
		const config = require('../xero-login.json');
		return config;
	} else {
		return {
			userName: process.env.UserName,
			password: process.env.Password
		};
	}

}

export function getPartnerAppConfig() {
	if (!process.env.CI) {
		const config = require('../partner-config.json');
		return config;
	} else {
		return {
			AppType: 'partner',
			ConsumerKey: process.env.PartnerConsumerKey,
			ConsumerSecret: process.env.PartnerConsumerSecret,
			CallbackBaseUrl: null,
			PrivateKeyCert: path.resolve(__dirname, '.', 'privatekey.pem')
		};
	}
}

export function setJestTimeout() {
	if (jest) {
		jest.setTimeout(60000);
	}
}
