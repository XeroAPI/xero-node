import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/journals', () => {
	let xero: AccountingAPIClient;
	let existingId: string;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	it('can get all', async () => {
		const response = await xero.journals.get();
		expect(response.Journals[0].JournalID).toBeDefined();

		existingId = response.Journals[0].JournalID;
	});

	it('can get single', async () => {
		const newResponse = await xero.journals.get({ Recordfilter: existingId });
		expect(newResponse.Journals[0].JournalID).toEqual(existingId);
	});

});
