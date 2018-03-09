import { AccountingAPIClient } from '../AccountingAPIClient';
import * as opn from 'opn';
import { readLine } from './helpers/integration.helpers';

(async function main() {
	const config = require('../partner-config.json');
	const accounting1 = new AccountingAPIClient(config);

	try {
		await accounting1.oauth1.getUnauthorisedRequestToken();
		const url = await accounting1.oauth1.buildAuthoriseUrl();

		opn(url);
		console.log('Copy and past the pin from the auth page:');
		const pin = await readLine('PIN: ');

		await accounting1.oauth1.swapRequestTokenforAccessToken(pin);
		const inv1 = await accounting1.invoices.get();
		console.log('Number of invoices (1): ', inv1.Invoices.length);

		await accounting1.oauth1.refreshAccessToken();
		const inv2 = await accounting1.invoices.get();
		console.log('Number of invoices (2): ', inv2.Invoices.length);

		// Save state into your datastore
		const state = await accounting1.oauth1.state;
		// Restore a new instance of the Client next time your user logs in

		const accounting2 = new AccountingAPIClient(config);
		accounting2.oauth1.setState(state);

		// Now we can make the same request
		const inv3 = await accounting1.invoices.get();
		console.log('Number of invoices (3): ', inv3.Invoices.length);

		await accounting1.oauth1.refreshAccessToken();
		// Now we can make the same request
		const inv4 = await accounting1.invoices.get();
		console.log('Number of invoices (4): ', inv4.Invoices.length);
	} catch (error) {
		console.log('ERROR: ', error);
	}
})();
