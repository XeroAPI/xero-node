import { PracticeAPIClient } from '../PracticeAPIClient';
import { getPartnerAppConfig, setJestTimeout } from './helpers/integration.helpers';

setJestTimeout();

describe('Practice API Tests', () => {
	const config = getPartnerAppConfig();
	const client = new PracticeAPIClient(config);

	it('I can get a Practice Auth Token', async () => {
		const requestToken = await client.oauth1Client.getRequestToken();
		expect(requestToken).toBeDefined();
		expect(typeof requestToken.oauth_token).toEqual('string');
	});

});
