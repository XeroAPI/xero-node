import { IXeroClientConfiguration, XeroAPIClient } from '../../XeroAPIClient';
import { InMemoryOAuthLib } from './InMenoryOAuthLib';

describe('XeroAPIClient', () => {
	let xeroClientConfig: IXeroClientConfiguration;
	let testXeroAPIClient: XeroAPIClient;
	describe('OAuthClient App Types', () => {
		describe('For Private Apps', () => {
			beforeAll(() => {
				xeroClientConfig = {
					appType: 'private',
					consumerKey: 'myConsumerKey',
					consumerSecret: 'myConsumerSecret',
					privateKey: 'shhhhhhh',
					userAgent: 'xero-node-v3-unit-test'
				};
				testXeroAPIClient = new XeroAPIClient(xeroClientConfig);
			});

			it('sets the options for Private Apps', () => {
				expect(testXeroAPIClient.state.oauthToken).toEqual(xeroClientConfig.consumerKey);
				expect(testXeroAPIClient.state.oauthSecret).toEqual(xeroClientConfig.privateKey);
				expect(testXeroAPIClient.state.consumerKey).toEqual(xeroClientConfig.consumerKey);
				expect(testXeroAPIClient.state.consumerSecret).toEqual(xeroClientConfig.privateKey);
				expect(testXeroAPIClient.state.signatureMethod).toEqual('RSA-SHA1');
			});
		});

		describe('For Public Apps', () => {
			beforeAll(() => {
				xeroClientConfig = {
					appType: 'public',
					consumerKey: 'myConsumerKey',
					consumerSecret: 'myConsumerSecret',
					userAgent: 'xero-node-v3-unit-test'
				};
				testXeroAPIClient = new XeroAPIClient(xeroClientConfig);
			});

			it('sets the options for Public Apps', () => {
				expect(testXeroAPIClient.state.oauthToken).toBeNull();
				expect(testXeroAPIClient.state.oauthSecret).toBeNull();
				expect(testXeroAPIClient.state.consumerKey).toEqual(xeroClientConfig.consumerKey);
				expect(testXeroAPIClient.state.consumerSecret).toEqual(xeroClientConfig.consumerSecret);
				expect(testXeroAPIClient.state.signatureMethod).toEqual('HMAC-SHA1');
			});
		});

		describe('For Partner Apps', () => {
			beforeAll(() => {
				xeroClientConfig = {
					appType: 'partner',
					consumerKey: 'myConsumerKey',
					consumerSecret: 'myConsumerSecret',
					privateKey: 'shhhhhhh',
					userAgent: 'xero-node-v3-unit-test'
				};
				testXeroAPIClient = new XeroAPIClient(xeroClientConfig);
			});

			it('sets the options for Partner Apps', () => {
				expect(testXeroAPIClient.state.oauthToken).toEqual(xeroClientConfig.consumerKey);
				expect(testXeroAPIClient.state.oauthSecret).toEqual(xeroClientConfig.privateKey);
				expect(testXeroAPIClient.state.consumerKey).toEqual(xeroClientConfig.consumerKey);
				expect(testXeroAPIClient.state.consumerSecret).toEqual(xeroClientConfig.privateKey);
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
				appType: 'private',
				consumerKey: 'myConsumerKey',
				consumerSecret: 'myConsumerSecret',
				privateKey: 'shhhhhhh',
				userAgent: 'xero-node-v3-unit-test'
			};
			testXeroAPIClient = new XeroAPIClient(xeroClientConfig, null, inMemoryOAuthLib);
			oauthToken = testXeroAPIClient.state.oauthToken;
			oauthSecret = testXeroAPIClient.state.oauthSecret;
			inMemoryOAuthLib.setTokenSecret(oauthToken, oauthSecret);
			unauthRequestToken = await testXeroAPIClient.oauth10a.getUnauthorisedRequestToken();
		});
		it('getUnauthorisedRequestToken returns the request token', () => {
			expect(unauthRequestToken).toMatchObject({oauth_token: oauthToken, oauth_token_secret: oauthSecret});
		});
	});
});
