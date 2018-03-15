import { PracticeAPIClient } from '../PracticeAPIClient';
import { getPartnerAppConfig, setJestTimeout } from './helpers/integration.helpers';

setJestTimeout();

describe('Practice API Tests', () => {
	const config = getPartnerAppConfig();
	const client = new PracticeAPIClient(config);

	it('I can get a Practice Auth Token', async () => {
		await client.oauth1Client.getUnauthorisedRequestToken();
		const state = client.oauth1Client.getState();
		expect(state.requestToken).toBeDefined();
		expect(typeof state.requestToken.oauth_token).toEqual('string');
	});

});
