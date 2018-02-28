import { IXeroClientConfiguration, XeroAPIClient } from '../../XeroAPIClient';

describe('OAuthClient App Types', () => {
	let xeroClientConfig: IXeroClientConfiguration;
	let testXeroAPIClient: XeroAPIClient;
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

});
