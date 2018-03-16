import { IXeroClientConfiguration } from '../internals/BaseAPIClient';
import { OAuth1HttpClient, IOAuth1State, IOAuth1HttpClient } from '../internals/OAuth1HttpClient';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { mapState, mapConfig } from '../internals/config-helper';
import { validTestCertPath } from '../internals/__tests__/helpers/privateKey-helpers';
import { InMemoryOAuthLibFactoryFactory } from '../internals/__tests__/helpers/InMemoryOAuthLib';
import * as fs from 'fs';
import * as path from 'path';

const accountingBaseUrl = 'https://api.xero.com/api.xro/2.0/';
const guid1 = 'dcb417fc-0c23-4ba3-bc7f-fbc718e7e663';
const guid2 = '857c9e3f-640a-4df2-99fd-dd0e52a785e7';

export interface IEndPointDetails {
	action: string;
	expectedPath: string;
	subResource?: string;
	args?: any;
}

export interface IFixture {
	[key: string]: IEndPointDetails[];
}

const xeroConfig: IXeroClientConfiguration = {
	appType: 'private',
	consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
	consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
	privateKeyPath: validTestCertPath()
};

describe('AccountingAPI', () => {
	const inMemoryOAuthLibFF = new InMemoryOAuthLibFactoryFactory();

	const oauthHttpClient = new OAuth1HttpClient(mapConfig(xeroConfig, {}), inMemoryOAuthLibFF.newFactory());
	oauthHttpClient.setState(mapState(xeroConfig));
	const xeroClient = new AccountingAPIClient(xeroConfig, oauthHttpClient);

	const actionToVerbMap: { [key: string]: string } = {
		create: 'put',
		delete: 'delete',
		update: 'post',
		get: 'get'
	};

	const fixtures: IFixture = {
		invoices: [
			{ action: 'get', expectedPath: 'invoices' },
			{ action: 'get', expectedPath: `invoices/${guid1}`, args: { InvoiceID: guid1 } },
			{ action: 'get', expectedPath: `invoices/${'INV-123'}`, args: { InvoiceNumber: 'INV-123' } },
			{ action: 'get', expectedPath: `invoices/${guid1}?createdByMyApp=true`, args: { InvoiceID: guid1, createdByMyApp: true } },
			{ action: 'get', expectedPath: `invoices?where=Type%3D%3D%22ACCPAY%22`, args: { where: `Type=="ACCPAY"` } },
			{ action: 'get', expectedPath: `invoices?createdByMyApp=true&where=Type%3D%3D%22ACCPAY%22`, args: { where: `Type=="ACCPAY"`, createdByMyApp: true } },
			{ action: 'get', expectedPath: `invoices?Statuses=DRAFT%2CSUBMITTED`, args: { queryParams: 'Statuses=DRAFT,SUBMITTED' } },
			{ action: 'get', expectedPath: `invoices?order=something`, args: { order: 'something' } },
			{ action: 'get', expectedPath: `invoices?page=3`, args: { page: 3 } },
			{ action: 'get', expectedPath: `invoices?createdByMyApp=true&where=Type%3D%3D%22ACCREC%22&page=5&Statuses=DELETED`, args: { page: 5, queryParams: 'Statuses=DELETED', where: `Type=="ACCREC"`, createdByMyApp: true } },
			{ subResource: 'attachments', action: 'get', expectedPath: `invoices/${guid1}/attachments`, args: { EntityID: guid1 } },
			{ subResource: 'onlineInvoice', action: 'get', expectedPath: `invoices/${guid1}/onlineinvoice`, args: { InvoiceID: guid1 } },
			{ action: 'create', expectedPath: 'invoices?summarizeErrors=false' },
			{ action: 'update', expectedPath: `invoices/${guid1}?summarizeErrors=false`, args: { InvoiceID: guid1 } },
			{ action: 'update', expectedPath: `invoices?summarizeErrors=false` },
			{ action: 'update', expectedPath: `invoices/${'INV-123'}?summarizeErrors=false`, args: { InvoiceNumber: 'INV-123' } },
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
		(fixtures[endpoint]).map((fixture: IEndPointDetails) => {

			describe(`${endpoint} ${fixture.subResource || ''}.${fixture.action}(${fixture.args ? Object.keys(fixture.args) : ''})`, () => {
				let result: any;

				const mockedResponse = JSON.stringify({ a: 'response' });

				const hasRequestBody = (fixture.action == 'create' || fixture.action == 'update');
				const mockedRequestBody = hasRequestBody ? { a: 'request' } : null;

				beforeAll(async () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.reset();
					inMemoryOAuthLibFF.inMemoryOAuthLib.callbackResultsForNextCall(null, mockedResponse, { statusCode: 200 });

					// tslint:disable-next-line:prefer-conditional-expression
					if (fixture.subResource) {
						mockedRequestBody
							? result = await (xeroClient as any)[endpoint][fixture.subResource][fixture.action](mockedRequestBody, fixture.args)
							: result = await (xeroClient as any)[endpoint][fixture.subResource][fixture.action](fixture.args);
					} else {
						mockedRequestBody
							? result = await (xeroClient as any)[endpoint][fixture.action](mockedRequestBody, fixture.args)
							: result = await (xeroClient as any)[endpoint][fixture.action](fixture.args);
					}
				});

				it(`calls the ${fixture.expectedPath} endpoint`, () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.lastCalledThisURL(accountingBaseUrl + fixture.expectedPath);
				});

				it(`calls the ${actionToVerbMap[fixture.action]} verb`, () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.lastCalledThisVerb(actionToVerbMap[fixture.action]);
				});

				it('requested with expected body', () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.lastRequestedHadBody(mockedRequestBody);
				});

				it('matches the expected response', () => {
					expect(result).toMatchObject(JSON.parse(mockedResponse));
				});
			});
		});

	});
});

describe('Endpoints with attachments', () => {
	const writeResponseToStreamSpy = jest.fn();
	const oAuth1HttpClient: IOAuth1HttpClient = {
		get: undefined,
		put: undefined,
		post: undefined,
		delete: undefined,
		writeResponseToStream: writeResponseToStreamSpy,
		setState: undefined,
		getState: undefined,
		getUnauthorisedRequestToken: undefined,
		buildAuthoriseUrl: undefined,
		swapRequestTokenforAccessToken: undefined,
		refreshAccessToken: undefined
	};

	const tempAttachmentLocation = path.resolve(__dirname, 'temp-image.jpg');

	// Invoices [x]
	// Receipts [ ]
	// Credit Notes [ ]
	// Repeating Invoices [ ]
	// Bank Transactions [ ]
	// Bank Transfers [ ]
	// Contacts [x]
	// Accounts [ ]
	// Manual Journals [ ]

	const fixtures: IFixture = {
		invoices: [
			{ action: 'downloadAttachment', expectedPath: `invoices/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityID: guid1, fileName: 'bean.jpg' } }
		],
		contacts: [
			{ action: 'downloadAttachment', expectedPath: `contacts/${guid1}/attachments/bean.jpg`, args: { mimeType: 'image/jpg', pathToSave: tempAttachmentLocation, entityID: guid1, fileName: 'bean.jpg' } }
		]
	};

	const actionToSpyMap: { [key: string]: jest.Mock<{}> } = {
		downloadAttachment: writeResponseToStreamSpy
	};

	Object.keys(fixtures).map((endpoint: string) => {
		(fixtures[endpoint]).map((fixture: IEndPointDetails) => {

			describe(`${endpoint} attachments & ${fixture.action} calls`, () => {
				let result: any;

				beforeAll(async () => {
					jest.resetAllMocks();

					const streamToUse = fs.createReadStream(path.resolve(__dirname, 'helpers/bean.jpg'));
					writeResponseToStreamSpy.mockImplementation((endpointPath: string, mimeType: string, writeStream: fs.WriteStream) => {
						return new Promise<void>((resolve, reject) => {
							streamToUse.pipe(writeStream);
							streamToUse.on('end', () => {
								resolve();
							});
						});
					});

					const xeroClient = new AccountingAPIClient(xeroConfig, oAuth1HttpClient);

					result = await (xeroClient as any)[endpoint]['attachments'][fixture.action](fixture.args);
				});

				it(`calls the underlying HTTPClient method`, () => {
					expect(actionToSpyMap[fixture.action]).toHaveBeenCalledTimes(1);
				});

				it(`calls HTTPClient with endpoint=${fixture.expectedPath}`, () => {
					expect(actionToSpyMap[fixture.action].mock.calls[0][0]).toEqual(fixture.expectedPath);
				});

				it(`calls HTTPClient with mimeType=${fixture.args.mimeType}`, () => {
					expect(actionToSpyMap[fixture.action].mock.calls[0][1]).toEqual(fixture.args.mimeType);
				});

				it(`calls HTTPClient with writeStream path=${tempAttachmentLocation}`, () => {
					const writeStream = actionToSpyMap[fixture.action].mock.calls[0][2];
					expect(writeStream).toHaveProperty('path');
					expect(writeStream.path).toEqual(tempAttachmentLocation);
				});

				it('result is undefined', () => {
					expect(result).toBeUndefined();
				});

				it('saves attachment to disk', async () => {
					expect(fs.existsSync(tempAttachmentLocation)).toBeTruthy();
					const stat = fs.statSync(tempAttachmentLocation);
					expect(stat.size).toBe(23951);
				});

				afterAll(() => {
					fs.unlinkSync(tempAttachmentLocation);
				});
			});
		});
	});
});

describe('AccountingAPIClient', () => {
	// Added these as there was some weird this stuff happeneing. Could be temp.
	let accountClient: AccountingAPIClient;

	const defaultState: IOAuth1State = {
		requestToken: {
			oauth_token: 'test3',
			oauth_token_secret: 'test4'
		},
		accessToken: {
			oauth_token: 'test7',
			oauth_token_secret: 'test8'
		},
		oauth_session_handle: 'test9'
	};

	const xeroPartnerConfig: IXeroClientConfiguration = {
		appType: 'partner',
		consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
		consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
		privateKeyPath: validTestCertPath()
	};

	describe('and setting state', () => {

		beforeEach(() => {
			accountClient = new AccountingAPIClient(xeroPartnerConfig);
			accountClient.oauth1Client.setState(defaultState);
		});

		it('matches what it was set to', () => {
			expect(accountClient.oauth1Client.getState()).toMatchObject(defaultState);
		});

		it('only overrides the accessToken keys', () => {
			accountClient.oauth1Client.setState({
				accessToken: { oauth_token: 'something new', oauth_token_secret: 'something borrowed' }
			});

			expect(accountClient.oauth1Client.getState()).not.toEqual(defaultState);
			expect(accountClient.oauth1Client.getState()).toEqual({
				requestToken: {
					oauth_token: 'test3',
					oauth_token_secret: 'test4'
				},
				accessToken: {
					oauth_token: 'something new',
					oauth_token_secret: 'something borrowed'
				},
				oauth_session_handle: 'test9'
			});
		});

		it('only overrides the requestToken keys', () => {
			accountClient.oauth1Client.setState({ oauth_session_handle: 'yoyo' });

			expect(accountClient.oauth1Client.getState()).not.toEqual(defaultState);
			expect(accountClient.oauth1Client.getState()).toEqual({
				requestToken: {
					oauth_token: 'test3',
					oauth_token_secret: 'test4'
				},
				accessToken: {
					oauth_token: 'test7',
					oauth_token_secret: 'test8'
				},
				oauth_session_handle: 'yoyo'
			});
		});

		it('only overrides the oauth_session_handle keys', () => {
			accountClient.oauth1Client.setState({
				requestToken: { oauth_token: 'something new', oauth_token_secret: 'something borrowed' }
			});

			expect(accountClient.oauth1Client.getState()).not.toEqual(defaultState);
			expect(accountClient.oauth1Client.getState()).toEqual({
				requestToken: {
					oauth_token: 'something new',
					oauth_token_secret: 'something borrowed'
				},
				accessToken: {
					oauth_token: 'test7',
					oauth_token_secret: 'test8'
				},
				oauth_session_handle: 'test9'
			});
		});

	});
});
