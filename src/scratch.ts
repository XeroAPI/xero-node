import * as path from 'path';
import * as fs from 'fs';
import { AccountingAPIClient } from './endpoints/AccountingAPIClient';

const privateKeyFile = path.resolve(__dirname, '..', 'privatekey.pem');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

// TODO: Let them pass in the privateKey and privateKey path
const data = require('./xero.json');
const xero = new AccountingAPIClient({ ...data, ...{ PrivateKeyCert: privateKey } });

async function main() {
	const bungInvoice = {
		Type: 'ACaCREC',
		Contact: {
			Name: 'Martin Hudson'
		},
		Date: '2018-02-15T00:00:00',
		DueDate: '2018-02-22T00:00:00',
		LineAmountTypes: 'Exclusive',
		LineItems: [{
			Description: 'Monthly rental for property at 56a Wilkins Avenue',
			Quantity: 4.3400,
			UnitAmount: 395.00,
			AccountCode: '200'
		}]
	};

	try {
		const res = await xero.invoices.create(bungInvoice);
		console.log('SUCCESS: ', res);
		console.log('HasErrors: ', res.Invoices[0].HasErrors);
		console.log('ValidationErrors: ', res.Invoices[0].ValidationErrors);
		console.log('LineItems: ', res.Invoices[0].LineItems);

	} catch (error) {
		console.log('error: ', error);
	}

}

main();
