import { AccountingAPIClient } from '../../endpoints/AccountingAPIClient';
import { InMemoryOAuthLib } from './InMemoryOAuthLib';
import { validTestCertPath } from '../test-helpers';

const accountingBaseUrl = 'https://api.xero.com/api.xro/2.0/';
const aGuid = 'dcb417fc-0c23-4ba3-bc7f-fbc718e7e663';

describe('Endpoint: ', () => {
	const inMemoryOAuthLib = new InMemoryOAuthLib();

	const xeroClient = new AccountingAPIClient({
		AppType: 'private',
		ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
		ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
		PrivateKeyCert: validTestCertPath
	}, null, inMemoryOAuthLib);

	// TODO: figure out contactgroups.contacts
	// TODO: Double check when an endpoint and take an ID and add a line for it
	[{ statusCode: 200, hasResponse: true, hasRequestBody: false, endpoint: 'invoices', action: 'get', expectedVerb: 'get', expectedUrl: 'invoices' },
	{ statusCode: 201, hasResponse: true, hasRequestBody: true, endpoint: 'invoices', action: 'create', expectedVerb: 'put', expectedUrl: 'invoices?summarizeErrors=false' },
	{ statusCode: 200, hasResponse: true, hasRequestBody: false, endpoint: 'contactgroups', action: 'get', expectedVerb: 'get', expectedUrl: 'contactgroups' },
	{ statusCode: 201, hasResponse: true, hasRequestBody: true, endpoint: 'contactgroups', action: 'create', expectedVerb: 'put', expectedUrl: 'contactgroups?summarizeErrors=false' },
	{ statusCode: 200, hasResponse: true, hasRequestBody: true, endpoint: 'contactgroups', action: 'update', expectedVerb: 'post', expectedUrl: `contactgroups/${aGuid}?summarizeErrors=false`, args: { ContactGroupID: aGuid } },
	{ statusCode: 200, hasResponse: true, hasRequestBody: false, endpoint: 'currencies', action: 'get', expectedVerb: 'get', expectedUrl: `currencies` },
	{ statusCode: 200, hasResponse: true, hasRequestBody: true, endpoint: 'currencies', action: 'create', expectedVerb: 'put', expectedUrl: `currencies` },
	].map((test) => {

		let result: any;

		describe(`${test.endpoint} & ${test.action} calls`, () => {
			const mockedResponse = { a: 'response' };
			const mockedRequest = { a: 'request' };

			beforeAll(async () => {
				inMemoryOAuthLib.reset();
				inMemoryOAuthLib.callbackResultsForNextCall(null, test.hasResponse ? JSON.stringify(mockedResponse) : null, { statusCode: test.statusCode });
				result = await (xeroClient as any)[test.endpoint][test.action](test.hasRequestBody ? mockedRequest : null, test.args ? test.args : null);
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
			} else {
				it(`sent request with empty body`, () => {
					inMemoryOAuthLib.lastRequestHadNoBody();
				});
			}

			it('matches the expected response', () => {
				expect(result).toMatchObject(mockedResponse);
			});
		});
	});
});
