import { IXeroClientConfiguration, XeroAPIClient } from '../../XeroAPIClient';
import { InMemoryOAuthLib } from './InMemoryOAuthLib';
import { TestAPIClient } from './TestAPIClient';
import { getStringFromFile } from '../../utils';
import { validTestCertPath } from '../test-helpers';

const cert = getStringFromFile('./src/__tests__/unit/test-privatekey.pem');

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
					PrivateKeyCert: validTestCertPath
				};
				testXeroAPIClient = new TestAPIClient(xeroClientConfig);
			});

			it('sets the options for Private Apps', () => {
				expect(testXeroAPIClient.state.oauthToken).toEqual(xeroClientConfig.ConsumerKey);
				expect(testXeroAPIClient.state.oauthSecret).toEqual(cert);
				expect(testXeroAPIClient.state.consumerKey).toEqual(xeroClientConfig.ConsumerKey);
				expect(testXeroAPIClient.state.oauthSecret).toEqual(cert);
				expect(testXeroAPIClient.state.signatureMethod).toEqual('RSA-SHA1');
			});
		});

		describe('For Public Apps', () => {
			beforeAll(() => {
				xeroClientConfig = {
					AppType: 'public',
					ConsumerKey: 'myConsumerKey',
					ConsumerSecret: 'myConsumerSecret'

				};
				testXeroAPIClient = new TestAPIClient(xeroClientConfig);
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
					PrivateKeyCert: validTestCertPath
				};
				testXeroAPIClient = new TestAPIClient(xeroClientConfig);
			});

			it('sets the options for Partner Apps', () => {
				expect(testXeroAPIClient.state.oauthToken).toEqual(xeroClientConfig.ConsumerKey);
				expect(testXeroAPIClient.state.oauthSecret).toEqual(cert);
				expect(testXeroAPIClient.state.consumerKey).toEqual(xeroClientConfig.ConsumerKey);
				expect(testXeroAPIClient.state.consumerSecret).toEqual(cert);
				expect(testXeroAPIClient.state.signatureMethod).toEqual('RSA-SHA1');
			});
		});

	});

	describe('XeroApiClient OAuth10a', () => {
		let unauthRequestToken: any;
		let accessToken: any;
		const inMemoryOAuthLib = new InMemoryOAuthLib();
		let oauthToken: string;
		let oauthSecret: string;
		beforeAll(async () => {
			xeroClientConfig = {
				AppType: 'private',
				ConsumerKey: 'myConsumerKey',
				ConsumerSecret: 'myConsumerSecret',
				PrivateKeyCert: validTestCertPath
			};
			testXeroAPIClient = new TestAPIClient(xeroClientConfig, null, inMemoryOAuthLib);
			oauthToken = testXeroAPIClient.state.oauthToken;
			oauthSecret = testXeroAPIClient.state.oauthSecret;
			inMemoryOAuthLib.setTokenSecret(oauthToken, oauthSecret);
			inMemoryOAuthLib.swapToAuthTokenSecret(`access+${oauthToken}`, `access+${oauthSecret}`);
			unauthRequestToken = await testXeroAPIClient.oauth10a.getUnauthorisedRequestToken();
			accessToken = await testXeroAPIClient.oauth10a.getAccessToken(unauthRequestToken, null);
		});

		it('it returns the request token', () => {
			expect(unauthRequestToken).toMatchObject({ oauth_token: oauthToken, oauth_token_secret: oauthSecret });
		});

		it('it builds the authorise url', () => {
			expect(testXeroAPIClient.oauth10a.buildAuthoriseUrl(unauthRequestToken.oauth_token)).toEqual(`https://api.xero.com/oauth/Authorize?oauth_token=${unauthRequestToken.oauth_token}`);
		});

		it('it returns the access token', () => {
			expect(accessToken).toMatchObject({ oauth_token: `access+${oauthToken}`, oauth_token_secret: `access+${oauthSecret}` });
		});
	});
});
