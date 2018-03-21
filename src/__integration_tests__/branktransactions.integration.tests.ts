import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/banktransactions', () => {
	let xero: AccountingAPIClient;
	let existingId: string;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	it('can get all', async () => {
		const response = await xero.bankTransactions.get();
		expect(response.BankTransactions[0].BankTransactionID).toBeDefined();

		existingId = response.BankTransactions[0].BankTransactionID;
	});

	it('can get single', async () => {
		const newResponse = await xero.bankTransactions.get({ BankTransactionID: existingId });
		expect(newResponse.BankTransactions[0].BankTransactionID).toBeDefined();
	});

	it('can update', async () => {
		const deleteResult = await xero.bankTransactions.update({
			BankTransactionID: existingId,
			Status: 'DELETED'
		});

		expect(deleteResult.BankTransactions[0].Status).toBe('DELETED');
	});
});
