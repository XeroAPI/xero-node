import { AccountingAPIClient } from '../AccountingAPIClient';
import { getOrCreateInvoiceId } from './helpers/entityId.helpers';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('history', () => {

	let xero: AccountingAPIClient;

	let invoiceId: string;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);

		invoiceId = await getOrCreateInvoiceId(xero);
	});

	it('can add a history note', async () => {
		const response = await xero.invoices.history.create({
			InvoiceID: invoiceId,
			HistoryNote: {
				Details: 'Hello from the xero-node SDK integration tests'
			}
		});

		expect(response.HistoryRecords).toHaveLength(1);
		expect(response.HistoryRecords[0].Details).toBe('Hello from the xero-node SDK integration tests');
	});

	it('get the history details', async () => {
		const response = await xero.invoices.history.get({
			InvoiceID: invoiceId
		});

		expect(response.HistoryRecords.length).toBeGreaterThan(0);
		expect(response.HistoryRecords.some((history) => history.Details === 'Hello from the xero-node SDK integration tests'));
	});
});
