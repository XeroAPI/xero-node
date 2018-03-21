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
		accounts: [
			{ action: 'get', expectedPath: 'accounts' },
			{ action: 'get', expectedPath: `accounts/${guid1}?order=TaxType`, args: { AccountID: guid1, order: 'TaxType' } },
			{ action: 'create', expectedPath: `accounts` },
			{ action: 'update', expectedPath: `accounts/${guid1}`, args: { AccountID: guid1 } },
			{ action: 'delete', expectedPath: `accounts/${guid1}`, args: { AccountID: guid1 } },
			{ subResource: 'attachments', action: 'get', expectedPath: `accounts/${guid1}/attachments`, args: { EntityID: guid1 } }
		],
		invoices: [
			{ action: 'get', expectedPath: 'invoices' },
			{ action: 'get', expectedPath: `invoices/${guid1}`, args: { InvoiceID: guid1 } },
			{ action: 'get', expectedPath: `invoices/${'INV-123'}`, args: { InvoiceNumber: 'INV-123' } },
			{ action: 'get', expectedPath: `invoices/${guid1}?createdByMyApp=true`, args: { InvoiceID: guid1, createdByMyApp: true } },
			{ action: 'get', expectedPath: `invoices?where=Type%3D%3D%22ACCPAY%22`, args: { where: `Type=="ACCPAY"` } },
			{ action: 'get', expectedPath: `invoices?where=Type%3D%3D%22ACCPAY%22&createdByMyApp=true`, args: { where: `Type=="ACCPAY"`, createdByMyApp: true } },
			{ action: 'get', expectedPath: `invoices?Statuses=DRAFT%2CSUBMITTED`, args: { Statuses: 'DRAFT,SUBMITTED' } },
			{ action: 'get', expectedPath: `invoices?order=something`, args: { order: 'something' } },
			{ action: 'get', expectedPath: `invoices?page=3`, args: { page: 3 } },
			{ action: 'get', expectedPath: `invoices?page=3`, args: { 'page': 3, 'If-Modified-Since': 'headerValue' } },
			{ action: 'get', expectedPath: `invoices?createdByMyApp=true&where=Type%3D%3D%22ACCREC%22&page=5&Statuses=DELETED`, args: { createdByMyApp: true, where: `Type=="ACCREC"`, page: 5, Statuses: 'DELETED' } },
			{ subResource: 'attachments', action: 'get', expectedPath: `invoices/${guid1}/attachments`, args: { EntityID: guid1 } },
			{ subResource: 'onlineInvoice', action: 'get', expectedPath: `invoices/${guid1}/onlineinvoice`, args: { InvoiceID: guid1 } },
			{ action: 'create', expectedPath: 'invoices?summarizeErrors=false' },
			{ action: 'update', expectedPath: `invoices/${guid1}?summarizeErrors=false`, args: { InvoiceID: guid1 } },
			{ action: 'update', expectedPath: `invoices?summarizeErrors=false` },
			{ action: 'update', expectedPath: `invoices/${'INV-123'}?summarizeErrors=false`, args: { InvoiceNumber: 'INV-123' } },
			{ action: 'update', expectedPath: `invoices/${'INV-123'}?summarizeErrors=true`, args: { InvoiceNumber: 'INV-123', summarizeErrors: true } },
			{ action: 'update', expectedPath: `invoices/${'INV-123'}?summarizeErrors=true`, args: { summarizeErrors: true, InvoiceNumber: 'INV-123' } },
			// { action: 'savePDF', expectedPath: `invoices/${guid1}`, args: { InvoiceID: guid1, savePath: '/dev/null'} },
			// { action: 'savePDF', expectedPath: `invoices/${'INV-123'}`, args: { InvoiceNumber: 'INV-123', savePath: '/dev/null' } },
		],
		invoiceReminders: [
			{ action: 'get', expectedPath: 'invoicereminders/settings' },
		],
		organisation: [
			{ action: 'get', expectedPath: 'organisation' },
			{ subResource: 'CISSettings', action: 'get', expectedPath: `organisation/${guid1}/CISSettings`, args: { OrganisationID: guid1 } }
		],
		contacts: [
			{ action: 'get', expectedPath: 'contacts' },
			{ action: 'get', expectedPath: `contacts/${guid1}`, args: { ContactID: guid1 } },
			{ action: 'get', expectedPath: `contacts?IDs=${guid1}%2C${guid2}`, args: { IDs: `${guid1},${guid2}` } },
			{ action: 'get', expectedPath: `contacts?where=Type%3D%3D%22BANK%22`, args: { where: 'Type=="BANK"' } },
			{ action: 'get', expectedPath: `contacts?order=EmailAddress%20DESC`, args: { order: 'EmailAddress DESC' } },
			{ action: 'get', expectedPath: `contacts?includeArchived=true`, args: { includeArchived: true } },
			{ action: 'get', expectedPath: `contacts`, args: { 'If-Modified-Since': 'headerValue' } },
			{ action: 'get', expectedPath: `contacts?where=Type%3D%3D%22BANK%22`, args: { where: 'Type=="BANK"' } },
			{ action: 'get', expectedPath: `contacts?order=EmailAddress%20DESC`, args: { order: 'EmailAddress DESC' } },
			{ action: 'get', expectedPath: `contacts?page=2`, args: { page: 2 } },
			{ subResource: 'CISsettings', action: 'get', expectedPath: `contacts/${guid1}/cissettings`, args: { ContactID: guid1 } },
			{ action: 'update', expectedPath: `contacts/${guid1}?summarizeErrors=false`, args: { ContactID: guid1 } },
			{ action: 'update', expectedPath: `contacts/${guid1}?summarizeErrors=true`, args: { summarizeErrors: true, ContactID: guid1 } },
			{ action: 'create', expectedPath: `contacts?summarizeErrors=false` },
			{ action: 'create', expectedPath: `contacts?summarizeErrors=true`, args: { summarizeErrors: true } },
		],
		contactgroups: [
			{ action: 'get', expectedPath: 'contactgroups' },
			{ action: 'get', expectedPath: 'contactgroups?where=Type%3D%3D%22BANK%22', args: { where: 'Type=="BANK"' } },
			{ action: 'get', expectedPath: 'contactgroups?order=EmailAddress%20DESC', args: { order: 'EmailAddress DESC' } },
			{ action: 'create', expectedPath: 'contactgroups?summarizeErrors=false' },
			{ action: 'update', expectedPath: `contactgroups/${guid1}?summarizeErrors=false`, args: { ContactGroupID: guid1 } },
			{ action: 'update', expectedPath: `contactgroups?summarizeErrors=false` },
			{ subResource: 'contacts', action: 'create', expectedPath: `contactgroups/${guid1}/contacts?summarizeErrors=false`, args: { ContactGroupID: guid1 } },
			{ subResource: 'contacts', action: 'delete', expectedPath: `contactgroups/${guid1}/contacts/${guid2}?summarizeErrors=false`, args: { ContactGroupID: guid1, ContactID: guid2 } },
			{ subResource: 'contacts', action: 'delete', expectedPath: `contactgroups/${guid1}/contacts?summarizeErrors=false`, args: { ContactGroupID: guid1 } },
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
			{ action: 'get', expectedPath: `employees`, args: { 'If-Modified-Since': 'headerValue' } },
			{ action: 'create', expectedPath: 'employees' },
			{ action: 'update', expectedPath: 'employees' }
		],
		expenseclaims: [
			{ action: 'get', expectedPath: 'expenseclaims' },
			{ action: 'get', expectedPath: `expenseclaims/${guid1}`, args: { ExpenseClaimID: guid1 } },
			{ action: 'get', expectedPath: `expenseclaims?order=Status`, args: { order: 'Status' } },
			{ action: 'create', expectedPath: `expenseclaims?summarizeErrors=false` },
			{ action: 'update', expectedPath: `expenseclaims?summarizeErrors=false` },
			{ action: 'update', expectedPath: `expenseclaims/${guid1}?summarizeErrors=false`, args: { ExpenseClaimID: guid1 } },
			{ action: 'update', expectedPath: `expenseclaims/${guid1}?summarizeErrors=true`, args: { ExpenseClaimID: guid1, summarizeErrors: true } },
		],
		items: [
			{ action: 'get', expectedPath: 'items' },
			{ action: 'get', expectedPath: `items/${guid1}`, args: { ItemID: guid1 } },
			{ action: 'get', expectedPath: `items/${guid1}?order=UpdatedDateUTC`, args: { ItemID: guid1, order: 'UpdatedDateUTC' } },
			{ action: 'create', expectedPath: `items?summarizeErrors=false` },
			{ action: 'update', expectedPath: `items?summarizeErrors=false` },
			{ action: 'update', expectedPath: `items/${guid1}?summarizeErrors=true`, args: { ItemID: guid1, summarizeErrors: true } },
		],
		payments: [
			{ action: 'get', expectedPath: 'payments' },
			{ action: 'get', expectedPath: `payments/${guid1}`, args: { PaymentID: guid1 } },
			{ action: 'get', expectedPath: `payments/${guid1}?order=UpdatedDateUTC`, args: { PaymentID: guid1, order: 'UpdatedDateUTC' } },
			{ action: 'get', expectedPath: `payments`, args: { 'If-Modified-Since': 'headerValue' } },
			{ action: 'create', expectedPath: `payments?summarizeErrors=false` },
			{ action: 'update', expectedPath: `payments?summarizeErrors=false` },
			{ action: 'update', expectedPath: `payments/${guid1}?summarizeErrors=true`, args: { PaymentID: guid1, summarizeErrors: true } },
		],
		prepayments: [
			{ action: 'get', expectedPath: 'prepayments' },
			{ action: 'get', expectedPath: `prepayments/${guid1}`, args: { PrepaymentID: guid1 } },
			{ action: 'get', expectedPath: `prepayments/${guid1}?order=UpdatedDateUTC`, args: { PrepaymentID: guid1, order: 'UpdatedDateUTC' } },
			{ action: 'get', expectedPath: `prepayments?page=5`, args: { 'page': 5, 'If-Modified-Since': 'headerValue' } },
			{ subResource: 'allocations', action: 'create', expectedPath: `prepayments/${guid1}/allocations`, args: { PrepaymentID: guid1 } },
			{ subResource: 'attachments', action: 'get', expectedPath: `prepayments/${guid1}/attachments`, args: { EntityID: guid1 } },
		],
		users: [
			{ action: 'get', expectedPath: 'users' },
			{ action: 'get', expectedPath: `users/${guid1}`, args: { UserID: guid1 } },
			{ action: 'get', expectedPath: `users?where=IsSubscriber%3D%3Dtrue`, args: { where: 'IsSubscriber==true' } },
			{ action: 'get', expectedPath: `users?order=EmailAddress%20DESC`, args: { order: 'EmailAddress DESC' } },
			{ action: 'get', expectedPath: `users`, args: { 'If-Modified-Since': 'headerValue' } },
		],
		journals: [
			{ action: 'get', expectedPath: 'journals' },
			{ action: 'get', expectedPath: `journals/${guid1}`, args: { Recordfilter: guid1 } },
			{ action: 'get', expectedPath: `journals?offset=2`, args: { offset: '2' } },
			{ action: 'get', expectedPath: `journals?paymentsOnly=true`, args: { paymentsOnly: true } },
			{ action: 'get', expectedPath: `journals`, args: { 'If-Modified-Since': 'headerValue' } },
		],
		reports: [
			{ action: 'get', expectedPath: 'reports' },
			{ action: 'get', expectedPath: `reports/${guid1}`, args: { ReportID: guid1 } },
			{ action: 'get', expectedPath: 'reports/TrialBalance', args: { ReportID: 'TrialBalance' } },
			{ action: 'get', expectedPath: 'reports/TenNinetyNine?reportYear=2013', args: { ReportID: 'TenNinetyNine', reportYear: 2013 } },
			{ action: 'get', expectedPath: 'reports/ProfitAndLoss?fromDate=2010-01-01&toDate=2011-01-01', args: { ReportID: 'ProfitAndLoss', fromDate: '2010-01-01', toDate: '2011-01-01' } }
		],
		brandingThemes: [
			{ action: 'get', expectedPath: 'brandingthemes' },
			{ action: 'get', expectedPath: `brandingthemes/${guid1}`, args: { BrandingThemeID: guid1 } },
		],
		trackingCategories: [
			{ action: 'get', expectedPath: 'trackingcategories' },
			{ action: 'get', expectedPath: 'trackingcategories?where=Status%3D%3D%22ACTIVE%22', args: { where: 'Status=="ACTIVE"' } },
			{ action: 'get', expectedPath: 'trackingcategories?order=Name%20DESC', args: { order: 'Name DESC' } },
			{ action: 'create', expectedPath: 'trackingcategories' },
			{ action: 'update', expectedPath: `trackingcategories/${guid1}`, args: { TrackingCategoryID: guid1 } },
			{ action: 'delete', expectedPath: `trackingcategories/${guid1}`, args: { TrackingCategoryID: guid1 } },
			{ subResource: 'trackingOptions', action: 'create', expectedPath: `trackingcategories/${guid1}/Options`, args: { TrackingCategoryID: guid1 } },
			{ subResource: 'trackingOptions', action: 'update', expectedPath: `trackingcategories/${guid1}/Options/${guid2}`, args: { TrackingCategoryID: guid1, TrackingOptionID: guid2 } },
			{ subResource: 'trackingOptions', action: 'delete', expectedPath: `trackingcategories/${guid1}/Options/${guid2}`, args: { TrackingCategoryID: guid1, TrackingOptionID: guid2 } }
		],
		bankTransfers: [
			{ action: 'get', expectedPath: 'banktransfers' },
			{ action: 'get', expectedPath: `banktransfers/${guid1}`, args: { BankTransferID: guid1 } },
			{ action: 'get', expectedPath: `banktransfers?where=Type%3D%3D%22BANK%22`, args: { where: 'Type=="BANK"' } },
			{ action: 'get', expectedPath: 'banktransfers' },
			{ action: 'create', expectedPath: `banktransfers?summarizeErrors=false` },
			{ subResource: 'attachments', action: 'get', expectedPath: `banktransfers/${guid1}/attachments`, args: { EntityID: guid1 } }
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
