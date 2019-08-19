import * as  prompt from 'prompt';
import * as path from 'path';
import { XeroClientConfiguration } from '../../internals/BaseAPIClient';

export async function readLine(stringPrompt: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		prompt.start();
		prompt.get([stringPrompt], function(err: Error, result: any) {
			resolve(result[stringPrompt]);
		});
	});
}

export function getPrivateConfig(testPartition?: string): XeroClientConfiguration {
	if (!process.env.CI) {
		const config: XeroClientConfiguration = require(`../private-config${(testPartition || '')}.json`);
		return config;
	} else {
		return {
			appType: 'private',
			consumerKey: process.env['PrivateConsumerKey' + (testPartition || '')],
			consumerSecret: process.env['PrivateConsumerKey' + (testPartition || '')],
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
