import { IXeroClientConfiguration } from '../internals/BaseAPIClient';
import { OAuth1HttpClient } from '../internals/OAuth1HttpClient';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { mapState, mapConfig } from '../internals/config-helper';
import { validTestCertPath } from '../internals/__tests__/helpers/privateKey-helpers';
import { InMemoryOAuthLibFactoryFactory } from '../internals/__tests__/helpers/InMemoryOAuthLib';
import { IFixture, IEndPointDetails } from './helpers/IFixture';

describe('AccountingAPI endpoints', () => {
	const guid1 = 'dcb417fc-0c23-4ba3-bc7f-fbc718e7e663';
	const guid2 = '857c9e3f-640a-4df2-99fd-dd0e52a785e7';

	const xeroConfig: IXeroClientConfiguration = {
		appType: 'private',
		consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
		consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
		privateKeyPath: validTestCertPath()
	};

	const inMemoryOAuthLibFF = new InMemoryOAuthLibFactoryFactory();

	const oauthConfig = mapConfig(xeroConfig, {});
	const accountingBaseUrl = oauthConfig.apiBaseUrl + oauthConfig.apiBasePath;
	const oauthHttpClient = new OAuth1HttpClient(oauthConfig, inMemoryOAuthLibFF.newFactory());
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
			{ action: 'get', expectedPath: `invoices?page=3`, args: { page: 3, headers: { imaheader: 'headerValue' } } },
			{ action: 'get', expectedPath: `invoices?createdByMyApp=true&where=Type%3D%3D%22ACCREC%22&page=5&Statuses=DELETED`, args: { page: 5, queryParams: 'Statuses=DELETED', where: `Type=="ACCREC"`, createdByMyApp: true } },
			{ subResource: 'attachments', action: 'get', expectedPath: `invoices/${guid1}/attachments`, args: { EntityID: guid1 } },
			{ subResource: 'onlineInvoice', action: 'get', expectedPath: `invoices/${guid1}/onlineinvoice`, args: { InvoiceID: guid1 } },
			{ action: 'create', expectedPath: 'invoices?summarizeErrors=false' },
			{ action: 'update', expectedPath: `invoices/${guid1}?summarizeErrors=false`, args: { InvoiceID: guid1 } },
			{ action: 'update', expectedPath: `invoices?summarizeErrors=false` },
			{ action: 'update', expectedPath: `invoices/${'INV-123'}?summarizeErrors=false`, args: { InvoiceNumber: 'INV-123' } },
		],
		organisation: [
			{ action: 'get', expectedPath: 'organisation' },
			{ subResource: 'getCISSetting', action: 'get', expectedPath: `organisation/${guid1}/CISSettings`, args: { OrganisationID: guid1 } }
		],
		contactgroups: [
			{ action: 'get', expectedPath: 'contactgroups' },
			{ action: 'get', expectedPath: 'contactgroups?where=Type%3D%3D%22BANK%22', args: { where: 'Type=="BANK"' } },
			{ action: 'get', expectedPath: 'contactgroups?order=EmailAddress%20DESC', args: { order: 'EmailAddress DESC' } },
			{ action: 'create', expectedPath: 'contactgroups?summarizeErrors=false' },
			{ action: 'update', expectedPath: `contactgroups/${guid1}?summarizeErrors=false`, args: { ContactGroupID: guid1 } },
			{ action: 'update', expectedPath: `contactgroups?summarizeErrors=false` },
			{ subResource: 'contacts', action: 'create', expectedPath: `contactgroups/${guid1}/contacts`, args: { ContactGroupID: guid1 } },
			{ subResource: 'contacts', action: 'delete', expectedPath: `contactgroups/${guid1}/contacts/${guid2}`, args: { ContactGroupID: guid1, ContactID: guid2 } },
			{ subResource: 'contacts', action: 'delete', expectedPath: `contactgroups/${guid1}/contacts`, args: { ContactGroupID: guid1 } },
		],
		currencies: [
			{ action: 'get', expectedPath: `currencies` },
			{ action: 'get', expectedPath: `currencies?where=Type%3D%3D%22BANK%22`, args: { where: 'Type=="BANK"' } },
			{ action: 'get', expectedPath: `currencies?order=EmailAddress%20DESC`, args: { order: 'EmailAddress DESC' } },
			{ action: 'create', expectedPath: `currencies` },
		],
		employees: [
			{ action: 'get', expectedPath: 'employees' },
			{ action: 'get', expectedPath: `employees/${guid1}`, args: { EmployeeID: guid1 } },
			{ action: 'get', expectedPath: `employees?where=Type%3D%3D%22BANK%22`, args: { where: 'Type=="BANK"' } },
			{ action: 'get', expectedPath: `employees?order=EmailAddress%20DESC`, args: { order: 'EmailAddress DESC' } },
			{ action: 'get', expectedPath: `employees`, args: { headers: { imaheader: 'headerValue' } } },
			{ action: 'create', expectedPath: 'employees' },
			{ action: 'update', expectedPath: 'employees' }
		],
		reports: [
			{ action: 'get', expectedPath: 'reports' },
			{ action: 'get', expectedPath: `reports/${guid1}`, args: { ReportID: guid1 }},
			{ action: 'get', expectedPath: 'reports/TrialBalance', args: { ReportID: 'TrialBalance' } },
			{ action: 'get', expectedPath: 'reports/TenNinetyNine?reportYear=2013', args: { ReportID: 'TenNinetyNine', reportYear: 2013 } },
			{ action: 'get', expectedPath: 'reports/ProfitAndLoss?fromDate=2010-01-01&toDate=2011-01-01', args: { ReportID: 'ProfitAndLoss', fromDate: '2010-01-01', toDate: '2011-01-01' } }
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
					inMemoryOAuthLibFF.inMemoryOAuthLib.setResponse(false, mockedResponse, { statusCode: 200 });

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
					inMemoryOAuthLibFF.inMemoryOAuthLib.lastCalledThisMethod(actionToVerbMap[fixture.action]);
				});

				if (fixture.args && fixture.args.headers) {
					it(`calls with expected headers`, () => {
						inMemoryOAuthLibFF.inMemoryOAuthLib.lastHadThisHeader(fixture.args.headers);
					});
				}

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
