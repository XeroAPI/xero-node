import { InMemoryOAuthLibFactoryFactory } from './helpers/InMemoryOAuthLib';
import { TestAPIClient } from './helpers/TestAPIClient';
import { BaseAPIClient, IXeroClientConfiguration } from '../BaseAPIClient';
import { OAuth1HttpClient } from '../OAuth1HttpClient';
import { mapConfig, mapState } from '../config-helper';
import { validTestCertPath } from './helpers/privateKey-helpers';

// TODO: Double check that there is not duplication with the Oauth1Http-errors tests. And maybe remove this one

describe('BaseAPIClient errors', () => {

	describe('HTTP 404', () => {
		const inMemoryOAuthLib = new InMemoryOAuthLibFactoryFactory();
		let xeroClient: BaseAPIClient;

		beforeAll(async () => {
			inMemoryOAuthLib.inMemoryOAuthLib.callbackResultsForNextCall({
				statusCode: 404,
				data: 'The resource you\'re looking for cannot be found'
			}, `The resource you're looking for cannot be found`, { statusCode: 404 });

			const xeroConfig: IXeroClientConfiguration = {
				appType: 'private',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				privateKeyPath: validTestCertPath()
			};
			// TODO: Move to test utils: GetTestClient() or something

			const oauthClient = new OAuth1HttpClient(mapConfig(xeroConfig, {}), inMemoryOAuthLib.newFactory());
			oauthClient.setState(mapState(xeroConfig));
			xeroClient = new TestAPIClient(xeroConfig, oauthClient);
		});

		it('error is expected', async () => {
			expect.assertions(2);
			try {
				await xeroClient.oauth1Client.get('endpoint');
			} catch (error){
				expect(error.statusCode).toEqual(404);
				expect(error.data).toEqual('The resource you\'re looking for cannot be found');
			}
		});
	});
});
