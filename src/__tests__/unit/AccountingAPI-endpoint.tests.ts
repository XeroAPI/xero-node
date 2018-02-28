import { AccountingAPIClient } from '../../endpoints/AccountingAPIClient';
import { InMemoryOAuthLib } from './InMemoryOAuthLib';
import { validTestCertPath } from '../test-helpers';

const accountingBaseUrl = 'https://api.xero.com/api.xro/2.0/';
const aGuid = 'dcb417fc-0c23-4ba3-bc7f-fbc718e7e663';

interface IEndPointDetails {
	action: string;
	expectedPath: string;
	args?: any;
}

interface IFixture {
	[key: string]: IEndPointDetails[];
}

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

	const actionToVerbMap: { [key: string]: string } = {
		create: 'put',
		delete: 'delete',
		update: 'post',
		get: 'get'
	};

	const fixtures: IFixture = {
		invoices: [
			{ action: 'get', expectedPath: 'invoices' },
			{ action: 'create', expectedPath: 'invoices?summarizeErrors=false' }
		],
		contactgroups: [
			{ action: 'get', expectedPath: 'contactgroups' },
			{ action: 'create', expectedPath: 'contactgroups?summarizeErrors=false' },
			{ action: 'update', expectedPath: `contactgroups/${aGuid}?summarizeErrors=false`, args: { ContactGroupID: aGuid } },
			{ action: 'update', expectedPath: `contactgroups/${aGuid}?summarizeErrors=false`, args: { ContactGroupID: aGuid } },
		],
		currencies: [
			{ action: 'get', expectedPath: `currencies` },
			{ action: 'create', expectedPath: `currencies` },
		],
		employees: [
			{ action: 'get', expectedPath: 'employees' },
			{ action: 'create', expectedPath: 'employees' }
		]
	};

	Object.keys(fixtures).map((endpoint: string) => {
		(fixtures[endpoint] as any).map((fixture: IEndPointDetails) => {

			describe(`${endpoint} & ${fixture.action} calls`, () => {
				let result: any;

				const mockedResponse = JSON.stringify({ a: 'response' });

				const hasRequestBody = (fixture.action == 'create' || fixture.action == 'update');
				const mockedRequest = hasRequestBody ? { a: 'request' } : null;

				beforeAll(async () => {
					inMemoryOAuthLib.reset();
					inMemoryOAuthLib.callbackResultsForNextCall(null, mockedResponse, { statusCode: 200 });
					result = await (xeroClient as any)[endpoint][fixture.action](mockedRequest, fixture.args);
				});

				it(`calls the ${fixture.expectedPath} endpoint`, () => {
					inMemoryOAuthLib.lastCalledThisURL(accountingBaseUrl + fixture.expectedPath);
				});

				it(`calls the ${actionToVerbMap[fixture.action]} verb`, () => {
					inMemoryOAuthLib.lastCalledThisVerb(actionToVerbMap[fixture.action]);
				});

				it('requested with expected body', () => {
					inMemoryOAuthLib.lastRequestedHadBody(mockedRequest);
				});

				it('matches the expected response', () => {
					expect(result).toMatchObject(JSON.parse(mockedResponse));
				});
			});
		});

	});
});
