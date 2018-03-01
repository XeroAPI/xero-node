import * as path from 'path';
import { AccountingAPIClient } from './endpoints/AccountingAPIClient';

(async function() {
	const data = require('./xero.json');
	const privateKeyFile = path.resolve(__dirname, '..', 'privatekey.pem');
	const xero = new AccountingAPIClient({ ...data, ...{ PrivateKeyCert: privateKeyFile } });

	const invalidInvoice = {
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
		const res = await xero.invoices.create(invalidInvoice);
		console.log('RESPONSE =', res);
		console.log('HasErrors =', res.Invoices[0].HasErrors);
		console.log('ValidationErrors =', res.Invoices[0].ValidationErrors);
		console.log('LineItems =', res.Invoices[0].LineItems);

	} catch (error) {
		console.log('error =', error);
	}

})();
