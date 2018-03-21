import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { CreditNotesResponse } from '../AccountingAPI-types';

describe('/creditnotes', () => {
	let xero: AccountingAPIClient;
	let response: CreditNotesResponse;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('can get all', async () => {
		response = await xero.creditNotes.get();
		expect(response.CreditNotes[0].CreditNoteID).toBeDefined();
	});

	it('can get single', async () => {
		await xero.creditNotes.get({ CreditNoteID: response.CreditNotes[0].CreditNoteID });
		expect(response.CreditNotes[0].CreditNoteID).toBeDefined();
	});
});
