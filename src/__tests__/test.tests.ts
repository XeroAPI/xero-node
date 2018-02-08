
import { XeroAPIClient } from '../client';
import * as path from 'path';
import * as fs from 'fs';

const privateKeyFile = path.resolve('C:\\keys\\privatekey.pem');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

const xero = new XeroAPIClient({
	appType: 'private',
	consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
	consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
	privateKey: privateKey
});

describe('invoice endpoint', () => {
	let result: any = null;

	beforeAll(async () => {

		result = await xero.get('invoice', { Id: '0e64a623-c2a1-446a-93ed-eb897f118cbc' }) as any;
	});

	it('The invoice is defined', () => {
		expect(result).not.toBeNull();
	});

	it('invoice.Id is a Guid', async () => {
		expect(isUUID(result.Id)).toBeTruthy();
	});
});

function isUUID(s: string) {
	return s.match(`^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`);
}
