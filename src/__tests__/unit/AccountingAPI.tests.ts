import { AccountingAPIClient } from '../../endpoints/AccountingAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { InMemoryOAuthLib } from './InMemoryOAuthLib';

const privateKeyFile = path.resolve(__dirname + '/test-privatekey.pem');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

const accountingBaseUrl = 'https://api.xero.com/api.xro/2.0/';
const aGuid = 'dcb417fc-0c23-4ba3-bc7f-fbc718e7e663';

describe('Endpoint: ', () => {
	const inMemoryOAuthLib = new InMemoryOAuthLib();

	const xeroClient = new AccountingAPIClient({
		AppType: 'private',
		ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
		ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
		PrivateKeyCert: privateKey
	}, null, inMemoryOAuthLib);

	const endpoints = [{ statusCode: 200, hasResponse: true, hasRequestBody: false, endpoint: 'invoices', action: 'get', expectedUrl: 'invoices', expectedVerb: 'get' },
	{ statusCode: 200, hasResponse: true, hasRequestBody: true, endpoint: 'invoices', action: 'create', expectedUrl: 'invoices?summarizeErrors=false', expectedVerb: 'put' },
	{ statusCode: 200, hasResponse: true, hasRequestBody: true, endpoint: 'contactgroups', action: 'get', expectedUrl: 'contactgroups', expectedVerb: 'get' }
	];

	endpoints.map((test) => {

		let result: any;

		describe(`${test.endpoint} & ${test.action} calls`, () => {
			const mockedResponse = { a: 'response' };
			const mockedRequest = { a: 'request' };

			beforeAll(async () => {
				inMemoryOAuthLib.callbackResultsForNextCall(null, test.hasResponse ? JSON.stringify(mockedResponse) : null, { statusCode: test.statusCode });
				result = await (xeroClient as any)[test.endpoint][test.action](test.hasRequestBody ? mockedRequest : null);
			});

			it('called the correct URL', () => {
				inMemoryOAuthLib.lastCalledThisURL(accountingBaseUrl + test.expectedUrl);
			});

			it(`calls the ${test.expectedVerb} verb`, () => {
				inMemoryOAuthLib.lastCalledThisVerb(test.expectedVerb);
			});

			if (test.hasRequestBody) {
				it(`requested with the expected body`, () => {
					inMemoryOAuthLib.lastRequestedHadBody(JSON.stringify(mockedRequest));
				});
			}

			it('matches the expected response', () => {
				expect(result).toMatchObject(mockedResponse);
			});
		});
	});
});
