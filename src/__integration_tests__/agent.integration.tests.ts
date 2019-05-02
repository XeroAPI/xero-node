
import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig } from './helpers/integration.helpers';

describe('OAuth Client Custom HTTP Agent', () => {

	it('I can set a custom HTTP agent on the oauth client', async () => {

		const data = getPrivateConfig('1');
		const xero = new AccountingAPIClient(data);
		xero.oauth1Client.agent = 'not_an_agent' as any;

		expect.assertions(1);
		try {
			await xero.invoices.create({ test: 1 } as any);
		}
		catch (e) {
			expect(e.message).toContain('The \"options.agent\" property must be one of type Agent-like Object, undefined, or false. Received type string');
		}

	});
});
