import { AccountingAPIClient } from '../AccountingAPIClient';
import { XeroClientConfiguration } from '../internals/BaseAPIClient';
import { OAuth1HttpClient } from '../internals/OAuth1HttpClient';
import { InMemoryOAuthLibFactoryFactory } from '../internals/__tests__/helpers/InMemoryOAuthLib';
import { validTestCertPath } from '../internals/__tests__/helpers/privateKey-helpers';
import { mapConfig, mapState } from '../internals/config-helper';

interface IHistoryFixture {
	[key: string]: { idKey: string };
}

describe('AccountingAPI history', () => {
	const guid1 = 'dcb417fc-0c23-4ba3-bc7f-fbc718e7e663';

	const xeroConfig: XeroClientConfiguration = {
		appType: 'private',
		consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
		consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
		privateKeyPath: validTestCertPath()
	};

	const inMemoryOAuthLibFF = new InMemoryOAuthLibFactoryFactory();

	const oauthConfig = mapConfig(xeroConfig, { apiBasePath: '/api.xro/2.0/' });
	const accountingBaseUrl = oauthConfig.apiBaseUrl;
	const oauthHttpClient = new OAuth1HttpClient(oauthConfig, mapState(xeroConfig), inMemoryOAuthLibFF.newFactory());
	const xeroClient = new AccountingAPIClient(xeroConfig, null, oauthHttpClient);

	const fixtures: IHistoryFixture = {
		prepayments: { idKey: 'PrepaymentID' },
		bankTransactions: { idKey: 'BankTransactionID' },
		bankTransfers: { idKey: 'BankTransferID' },
		contacts: { idKey: 'ContactID' },
		creditNotes: { idKey: 'CreditNoteID' },
		expenseClaims: { idKey: 'ExpenseClaimID' },
		invoices: { idKey: 'InvoiceID' },
		items: { idKey: 'ItemID' },
		overpayments: { idKey: 'OverpaymentID' },
		payments: { idKey: 'PaymentID' },
		purchaseOrders: { idKey: 'PurchaseOrderID' },
		receipts: { idKey: 'ReceiptID' },
		repeatingInvoices: { idKey: 'RepeatingInvoiceID' }
	};

	Object.keys(fixtures).map((endpoint: string) => {

		const idValue = fixtures[endpoint].idKey;

		describe(`${endpoint}`, () => {
			describe(`and getting History`, () => {
				let result: any;
				const args: any = {};
				args[idValue] = guid1;

				const mockedResponse = JSON.stringify({ a: 'response' });

				beforeAll(async () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.reset();
					inMemoryOAuthLibFF.inMemoryOAuthLib.setResponse(false, mockedResponse, { statusCode: 200 });

					result = await (xeroClient as any)[endpoint]['history'].get(args);
				});

				it(`calls the ${endpoint} url`, () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.lastCalledThisURL(accountingBaseUrl + '/api.xro/2.0/' + endpoint.toLowerCase() + '/' + guid1 + '/history');
				});

				it(`calls the GET method`, () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.lastCalledThisMethod('get');
				});

				it('matches the expected response', () => {
					expect(result).toMatchObject(JSON.parse(mockedResponse));
				});
			});

			describe(`and creating History`, () => {
				let result: any;
				const args: any = {};
				args[idValue] = guid1;

				const mockedResponse = JSON.stringify({ a: 'response' });

				beforeAll(async () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.reset();
					inMemoryOAuthLibFF.inMemoryOAuthLib.setResponse(false, mockedResponse, { statusCode: 200 });

					result = await (xeroClient as any)[endpoint]['history'].create(args);
				});

				it(`calls the ${endpoint} url`, () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.lastCalledThisURL(accountingBaseUrl + '/api.xro/2.0/' + endpoint.toLowerCase() + '/' + guid1 + '/history');
				});

				it(`calls the PUT method`, () => {
					inMemoryOAuthLibFF.inMemoryOAuthLib.lastCalledThisMethod('put');
				});

				it('matches the expected response', () => {
					expect(result).toMatchObject(JSON.parse(mockedResponse));
				});
			});
		});
	});
});
