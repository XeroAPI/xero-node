import { AccountingAPIClient } from '../../endpoints/AccountingAPIClient';
import { InMemoryOAuthLib } from './InMemoryOAuthLib';
import { validTestCertPath } from '../test-helpers';

const accountingBaseUrl = 'https://api.xero.com/api.xro/2.0/';
const guid1 = 'dcb417fc-0c23-4ba3-bc7f-fbc718e7e663';
const guid2 = '857c9e3f-640a-4df2-99fd-dd0e52a785e7';

interface IEndPointDetails {
	action: string;
	expectedPath: string;
	subResource?: string;
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
			{ action: 'update', expectedPath: `contactgroups/${guid1}?summarizeErrors=false`, args: { ContactGroupID: guid1 } },
			{ subResource: 'contacts', action: 'delete', expectedPath: `contactgroups/${guid1}/contacts/${guid2}`, args: { ContactGroupID: guid1, ContactID: guid2 } },
			{ subResource: 'contacts', action: 'delete', expectedPath: `contactgroups/${guid1}/contacts`, args: { ContactGroupID: guid1 } },
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

			describe(`${endpoint} ${fixture.subResource} & ${fixture.action} calls`, () => {
				let result: any;

				const mockedResponse = JSON.stringify({ a: 'response' });

				const hasRequestBody = (fixture.action == 'create' || fixture.action == 'update');
				const mockedRequest = hasRequestBody ? { a: 'request' } : null;

				beforeAll(async () => {
					inMemoryOAuthLib.reset();
					inMemoryOAuthLib.callbackResultsForNextCall(null, mockedResponse, { statusCode: 200 });

					// tslint:disable-next-line:prefer-conditional-expression
					if (fixture.subResource) {
						mockedRequest
							? result = await (xeroClient as any)[endpoint][fixture.subResource][fixture.action](mockedRequest, fixture.args)
							: result = await (xeroClient as any)[endpoint][fixture.subResource][fixture.action](fixture.args);
					} else {
						mockedRequest
							? result = await (xeroClient as any)[endpoint][fixture.action](mockedRequest, fixture.args)
							: result = await (xeroClient as any)[endpoint][fixture.action](fixture.args);
					}
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
