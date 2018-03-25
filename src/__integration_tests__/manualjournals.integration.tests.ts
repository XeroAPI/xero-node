import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { getOrCreateManualJournalId } from './helpers/entityId.helpers';

describe('/manualJournals', () => {
	let xero: AccountingAPIClient;

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	it('create single', async () => {
		const response = await xero.manualJournals.create({
			Narration: 'Accrued expenses - prepaid insurance adjustment for January 2011',
			JournalLines: [
				{ LineAmount: 55.00, AccountCode: '433' },
				{ LineAmount: -55.00, AccountCode: '620' }
			]
		});

		expect(response.ManualJournals.length).toBe(1);
		expect(response.ManualJournals[0].StatusAttributeString).toEqual('OK');
	});

	it('get single', async () => {
		const response = await xero.manualJournals.get({ ManualJournalID: await getOrCreateManualJournalId(xero) });

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.ManualJournals.length).toBe(1);
		expect(response.ManualJournals[0].ManualJournalID).toBeTruthy();
	});

	it('get all', async () => {
		const response = await xero.manualJournals.get();

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.ManualJournals.length).toBeGreaterThan(0);
		expect(response.ManualJournals[0].ManualJournalID).toBeTruthy();
	});

	it('update', async () => {
		const response = await xero.manualJournals.update({
			ManualJournalID: await getOrCreateManualJournalId(xero),
			JournalLines: [
				{ LineAmount: 5.00, AccountCode: '433' },
				{ LineAmount: -5.00, AccountCode: '620' }
			]
		});

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.ManualJournals.length).toBe(1);
		expect(response.ManualJournals[0].ManualJournalID).toBeTruthy();
		expect(response.ManualJournals[0].StatusAttributeString).toEqual('OK');
	});
});
