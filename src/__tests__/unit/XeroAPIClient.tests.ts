import { IXeroClientConfiguration, XeroAPIClient } from '../../XeroAPIClient';
import { InMemoryOAuthLib } from './InMenoryOAuthLib';

describe('XeroAPIClient', () => {
	let xeroClientConfig: IXeroClientConfiguration;
	let testXeroAPIClient: XeroAPIClient;
	describe('OAuthClient App Types', () => {
		describe('For Private Apps', () => {
			beforeAll(() => {
				xeroClientConfig = {
					AppType: 'private',
					ConsumerKey: 'myConsumerKey',
					ConsumerSecret: 'myConsumerSecret',
					PrivateKeyCert: 'shhhhhhh',
					UserAgent: 'xero-node-v3-unit-test'
				};
				testXeroAPIClient = new XeroAPIClient(xeroClientConfig);
			});

			it('sets the options for Private Apps', () => {
				expect(testXeroAPIClient.state.oauthToken).toEqual(xeroClientConfig.ConsumerKey);
				expect(testXeroAPIClient.state.oauthSecret).toEqual(xeroClientConfig.PrivateKeyCert);
				expect(testXeroAPIClient.state.consumerKey).toEqual(xeroClientConfig.ConsumerKey);
				expect(testXeroAPIClient.state.consumerSecret).toEqual(xeroClientConfig.PrivateKeyCert);
				expect(testXeroAPIClient.state.signatureMethod).toEqual('RSA-SHA1');
			});
		});

		describe('For Public Apps', () => {
			beforeAll(() => {
				xeroClientConfig = {
					AppType: 'public',
					ConsumerKey: 'myConsumerKey',
					ConsumerSecret: 'myConsumerSecret',
					UserAgent: 'xero-node-v3-unit-test'
				};
				testXeroAPIClient = new XeroAPIClient(xeroClientConfig);
			});

			it('sets the options for Public Apps', () => {
				expect(testXeroAPIClient.state.oauthToken).toBeNull();
				expect(testXeroAPIClient.state.oauthSecret).toBeNull();
				expect(testXeroAPIClient.state.consumerKey).toEqual(xeroClientConfig.ConsumerKey);
				expect(testXeroAPIClient.state.consumerSecret).toEqual(xeroClientConfig.ConsumerSecret);
				expect(testXeroAPIClient.state.signatureMethod).toEqual('HMAC-SHA1');
			});
		});

		describe('For Partner Apps', () => {
			beforeAll(() => {
				xeroClientConfig = {
					AppType: 'partner',
					ConsumerKey: 'myConsumerKey',
					ConsumerSecret: 'myConsumerSecret',
					PrivateKeyCert: 'shhhhhhh',
					UserAgent: 'xero-node-v3-unit-test'
				};
				testXeroAPIClient = new XeroAPIClient(xeroClientConfig);
			});

			it('sets the options for Partner Apps', () => {
				expect(testXeroAPIClient.state.oauthToken).toEqual(xeroClientConfig.ConsumerKey);
				expect(testXeroAPIClient.state.oauthSecret).toEqual(xeroClientConfig.PrivateKeyCert);
				expect(testXeroAPIClient.state.consumerKey).toEqual(xeroClientConfig.ConsumerKey);
				expect(testXeroAPIClient.state.consumerSecret).toEqual(xeroClientConfig.PrivateKeyCert);
				expect(testXeroAPIClient.state.signatureMethod).toEqual('RSA-SHA1');
			});
		});

	});

	describe('XeroApiClient OAuth10a', () => {
		let unauthRequestToken: any;
		const inMemoryOAuthLib = new InMemoryOAuthLib();
		let oauthToken: string;
		let oauthSecret: string;
		beforeAll(async () => {
			xeroClientConfig = {
				AppType: 'private',
				ConsumerKey: 'myConsumerKey',
				ConsumerSecret: 'myConsumerSecret',
				PrivateKeyCert: 'shhhhhhh',
				UserAgent: 'xero-node-v3-unit-test'
			};
			testXeroAPIClient = new XeroAPIClient(xeroClientConfig, null, inMemoryOAuthLib);
			oauthToken = testXeroAPIClient.state.oauthToken;
			oauthSecret = testXeroAPIClient.state.oauthSecret;
			inMemoryOAuthLib.setTokenSecret(oauthToken, oauthSecret);
			unauthRequestToken = await testXeroAPIClient.oauth10a.getUnauthorisedRequestToken();
		});

		it('it returns the request token', () => {
			expect(unauthRequestToken).toMatchObject({oauth_token: oauthToken, oauth_token_secret: oauthSecret});
		});

		it('it builds the authorise url', () => {
			expect(testXeroAPIClient.oauth10a.buildAuthoriseUrl(unauthRequestToken.oauth_token)).toEqual(`https://api.xero.com/oauth/Authorize?oauth_token=${unauthRequestToken.oauth_token}`);
		});
	});
});
