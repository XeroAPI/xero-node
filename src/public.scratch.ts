import { XeroAPIClient } from './XeroAPIClient';
import * as  prompt from 'prompt';
import * as opn from 'opn';

// TODO: Let them pass in the privateKey and privateKey path
const data = require('./public_config.json');

const xero = new XeroAPIClient(data);

(async function() {
	const unauthRT = await xero.oauth10a.getUnauthorisedRequestToken();
	const url = xero.oauth10a.buildAuthorizeUrl(unauthRT.oauth_token);

	opn(url);

	console.log(url);

	console.log('working');
	let pin = 'temp';
	pin = 'temp2'; // Replace in debug with your pin
	// const pin = await readLine('PIN: ');
	// tslint:disable-next-line:no-debugger
	debugger;

	const access = await xero.oauth10a.getAccessToken(unauthRT, pin);

	console.log('fin', access);
})();

export async function readLine(stringPrompt: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		prompt.start();
		prompt.get([stringPrompt], function(err: Error, result: any) {
			resolve(result[stringPrompt]);
		});
	});
}
