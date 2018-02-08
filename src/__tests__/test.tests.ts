
import { XeroAPIClient } from '../XeroAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { AccountingResponse } from '../interfaces/AccountingResponse';

const privateKeyFile = path.resolve('C:\\keys\\privatekey.pem');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

const xero = new XeroAPIClient({
	appType: 'private',
	consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
	consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
	privateKey: privateKey
});

describe('invoice endpoint', () => {
	let result: AccountingResponse;

	beforeAll(async () => {
		result = await xero.invoice.get({ Id: '0e64a623-c2a1-446a-93ed-eb897f118cbc' });
	});

	it('The invoice is defined', () => {
		expect(result).not.toBeNull();
	});

	it('invoice.Id is a Guid and is actually the Id of the request', async () => {
		expect(isUUID(result.Id)).toBeTruthy();
	});

	it('invoice[0].InvoiceID is a Guid', async () => {
		expect(isUUID(result.Invoices[0].InvoiceID)).toBeTruthy();
	});
});

function isUUID(s: string) {
	return s.match(`^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`);
}
