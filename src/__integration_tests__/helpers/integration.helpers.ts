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

export function getConfig() {
	if (jest) {
		jest.setTimeout(30000);
	}

	try {
		const config = require('../private-config.json');
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
