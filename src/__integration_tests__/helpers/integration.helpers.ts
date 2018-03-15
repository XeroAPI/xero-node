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
			appType: 'private',
			consumerKey: process.env.ConsumerKey,
			consumerSecret: process.env.ConsumerSecret,
			callbackUrl: null,
			privateKeyPath: path.resolve(__dirname, '.', 'privatekey.pem')
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
			appType: 'partner',
			consumerKey: process.env.PartnerConsumerKey,
			consumerSecret: process.env.PartnerConsumerSecret,
			callbackUrl: null,
			privateKeyPath: path.resolve(__dirname, '.', 'privatekey.pem')
		};
	}
}

export function setJestTimeout() {
	if (jest) {
		jest.setTimeout(60000);
	}
}
