import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/overpayments', () => {
	let xero: AccountingAPIClient;
	// let overPaymentID: any;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	async function createOverpayment() {
		const response = await xero.bankTransactions.create({
			Type: 'RECEIVE-OVERPAYMENT',
			Contact: { ContactID: 'dc163e83-7438-4d7c-be1e-754a70babaec' },
			BankAccount: { Code: '090' },
			LineAmountTypes: 'NoTax',
			LineItems: [{
				Description: 'Forgot to cancel annual sub payment',
				LineAmount: 100.00
			}]
		});
		return response.BankTransactions[0].OverpaymentID;
	}

	it('get all', async () => {
		const overpaymentId = await createOverpayment();

		const response = await xero.overpayments.get({ OverpaymentID: overpaymentId });
		expect(response).toBeTruthy();
		expect(response.Overpayments).toBeInstanceOf(Array);
		expect(response.Overpayments[0]).toHaveProperty('Contact');
		expect(response.Overpayments[0].OverpaymentID).toBe(overpaymentId);
	});

	// it('get history', async () => {
	// 	const response = await xero.overpayments.history.get(overPaymentID);

	// 	expect(response.HistoryRecords[0]).toBeDefined();
	// });

	it('create allocation', async () => {
		const overpaymentId = await createOverpayment();

		const invoices = await xero.invoices.get({ pageSize: 1, where: 'Type=="ACCREC"&&Status=="AUTHORISED"' });
		const invoiceId = invoices.Invoices[0].InvoiceID;

		const response = await xero.overpayments.allocations.create(
			{
				Amount: 12,
				Invoice: {
					InvoiceID: invoiceId,
				}
			},
			{
				OverpaymentID: overpaymentId,
			}
		);

		expect(response).toBeTruthy();
		expect(response.Status).toBe('OK');
		console.log(JSON.stringify(response));
	});
});
