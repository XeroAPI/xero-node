import { OAuthClient, IOAuthClient, IOAuthClientConfiguration } from './../../OAuthClient';
import { IXeroClientConfiguration, XeroAPIClient } from '../../XeroAPIClient';
import { InMemoryOAuth } from './InMenoryOAuth';

describe('OAuthClient App Types', () => {
	let xeroClientConfig: IXeroClientConfiguration;
	let testXeroAPIClient;
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
