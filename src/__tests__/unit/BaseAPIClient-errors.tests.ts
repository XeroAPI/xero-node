import { InMemoryOAuthLib } from './helpers/InMemoryOAuthLib';
import { validTestCertPath } from '../test-helpers';
import { IXeroClientConfiguration, BaseAPIClient } from '../../BaseAPIClient';
import { OAuth1HttpClient } from '../../OAuth1HttpClient';
import { mapConfig, mapState } from '../../config-helper';
import { TestAPIClient } from './helpers/TestAPIClient';

// TODO: Double check that there is not duplication with the Oauth1Http-errors tests. And maybe remove this one

describe('BaseAPIClient errors', () => {

	describe('HTTP 404', () => {
		const inMemoryOAuthLib = new InMemoryOAuthLib();
		let xeroClient: BaseAPIClient;

		beforeAll(async () => {
			inMemoryOAuthLib.callbackResultsForNextCall({
				statusCode: 404,
				data: 'The resource you\'re looking for cannot be found'
			}, `The resource you're looking for cannot be found`, { statusCode: 404 });

			const xeroConfig: IXeroClientConfiguration = {
				AppType: 'private',
				ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				PrivateKeyCert: validTestCertPath
			};
			// TODO: Move to test utils: GetTestClient() or something

			const oauthClient = new OAuth1HttpClient(mapConfig(xeroConfig), inMemoryOAuthLib);
			oauthClient.setState(mapState(xeroConfig));
			xeroClient = new TestAPIClient(xeroConfig, oauthClient);
		});

		it('error is expected', async () => {
			expect.assertions(1);
			try {
				await xeroClient.http.get('endpoint');
			} catch (error){
				expect(error).toMatchObject({
					statusCode: 404,
					body: 'The resource you\'re looking for cannot be found'
				});
			}
		});
	});
});
