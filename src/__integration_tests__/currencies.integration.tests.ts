import { AccountingAPIClient } from '../AccountingAPIClient';
import { CurrenciesResponse } from '../AccountingAPI-types';
import { getPrivateConfig } from './helpers/integration.helpers';

const data = getPrivateConfig();
const xero = new AccountingAPIClient(data);

describe('/currencies integration tests', () => {
	describe('and creating and getting', () => {
		let result: CurrenciesResponse;

		beforeAll(async () => {
			try {
				await xero.currencies.create({ Code: 'PHP' });
			}
			// You can't delete currencies
			catch (e) {
				// Do Nothing
			}

			result = await xero.currencies.get();
		});

		it('the response is defined', () => {
			expect(result).not.toBeNull();
		});

		it('currency created can be fetched', async () => {
			expect(result.Currencies).toContainEqual({
				Code: 'PHP',
				Description: 'Philippine Peso'
			});
		});
	});

});
