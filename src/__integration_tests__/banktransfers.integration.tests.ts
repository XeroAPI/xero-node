import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { getOrCreateBankTransferId } from './helpers/entityId.helpers';

describe('/banktransfers', () => {
	let xero: AccountingAPIClient;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('can get all', async () => {
		const response = await xero.bankTransfers.get();
		expect(response.BankTransfers).toBeDefined();
	});

	it('can get single', async () => {
		const bankTransferId = await getOrCreateBankTransferId(xero);
		const newResponse = await xero.bankTransfers.get({ BankTransferID: bankTransferId });
		expect(newResponse.BankTransfers[0].Amount).toBeDefined();
	});

});
