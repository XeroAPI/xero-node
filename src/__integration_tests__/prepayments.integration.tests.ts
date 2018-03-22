import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/prepayments', () => {
	let xero: AccountingAPIClient;
	let existingId: string;

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('create via banktransactions endpoint', async () => {
		const response = await xero.bankTransactions.create({
			Type: 'RECEIVE-PREPAYMENT',
			Contact: { ContactID: '6d42f03b-181f-43e3-93fb-2025c012de92' },
			BankAccount: { Code: '090' },
			LineAmountTypes: 'Exclusive',
			LineItems: [
				{
					Description: 'Prepayment for Kitchen Designs',
					Quantity: 1,
					UnitAmount: 500.00,
					AccountCode: '200'
				}, {
					Description: 'Prepayment for Kitchen materials',
					Quantity: 1,
					UnitAmount: 1000.00,
					AccountCode: '200'
				}
			]
		});

		expect(response.BankTransactions.length).toBe(1);
		expect(response.BankTransactions[0].BankAccount.Code).toEqual('090');

		existingId = response.BankTransactions[0].BankTransactionID;
	});

	it('get all', async () => {
		const response = await xero.prepayments.get();

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Prepayments.length).toBeGreaterThan(0);
		expect(response.Prepayments[0].PrepaymentID).toBeTruthy();
	});

	it('get single', async () => {
		const response = await xero.prepayments.get({ PrepaymentID: existingId });

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Prepayments.length).toBe(1);
		expect(response.Prepayments[0].PrepaymentID).toEqual(existingId);
	});

	it('reverse via the payments endpoint', async () => {
		const response = await xero.payments.update({ PaymentID: existingId, Status: 'DELETED' });

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Payments.length).toBe(1);
		expect(response.Payments[0].PaymentID).toEqual(existingId);
		expect(response.Payments[0].Status).toEqual('DELETED');
	});
});
