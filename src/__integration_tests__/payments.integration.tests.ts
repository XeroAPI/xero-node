import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { getOrCreatePaymentId, getOrCreateInvoiceId } from './helpers/entityId.helpers';

describe('/payments', () => {
	let xero: AccountingAPIClient;
	let _idsToDelete: string[] = [];

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('can get all', async () => {
		const response = await xero.payments.get();
		expect(response.Payments).toBeDefined();
	});

	it('can get single', async () => {
		const paymentId = await getOrCreatePaymentId(xero);

		const response = await xero.payments.get({ PaymentID: paymentId });
		expect(response.Payments.length).toBe(1);
		expect(response.Payments[0].Amount).toBeDefined();
	});

	// it('get history', async () => {
	// 	const paymentId = await getOrCreatePaymentId(xero);
	// 	const response = await xero.payments.history.get({ PaymentID: paymentId });
		
	// 	expect(response.HistoryRecords[0]).toBeDefined();
	// });

	it('create', async () => {
		const response = await xero.payments.create({
			Invoice: { InvoiceID: await getOrCreateInvoiceId(xero) },
			Account: { Code: '200' },
			Amount: 0.75
		});

		expect(response.Payments.length).toBe(1);
		expect(response.Payments[0].Amount).toEqual(0.75);

		_idsToDelete = _idsToDelete.concat(response.Payments[0].PaymentID);
	});

	afterAll(async () => {
		await Promise.all(_idsToDelete.map((id) => xero.payments.update({ Status: 'DELETED' }, { PaymentID: id })));
	});
});
