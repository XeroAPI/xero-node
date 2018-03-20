import { AccountingAPIClient } from '../AccountingAPIClient';
import { BankTransfersResponse } from '../AccountingAPI-types';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/banktransfers', () => {
	let xero: AccountingAPIClient;
	let response: BankTransfersResponse;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('can get all', async () => {
		expect.assertions(1);

		response = await xero.bankTransfers.get();
		expect(response.BankTransfers[0].BankTransferID).toBeDefined();
	});

	it('can get single', async () => {
		expect.assertions(1);

		const newResponse = await xero.bankTransfers.get({ BankTransferID: response.BankTransfers[0].BankTransferID});
		expect(newResponse.BankTransfers[0].Amount).toBeDefined();
	});

});
