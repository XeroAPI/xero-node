import { IXeroClientConfiguration, XeroAPIClient } from '../../XeroAPIClient';
import { InMemoryOAuthLib } from './InMemoryOAuthLib';
import { TestAPIClient } from './TestAPIClient';
import { getStringFromFile } from '../../utils';
import { validTestCertPath } from '../test-helpers';

const cert = getStringFromFile(validTestCertPath);

describe('XeroAPIClient', () => {
	let testXeroAPIClient: XeroAPIClient;
	describe('when using a private app', () => {
		const xeroClientConfig: IXeroClientConfiguration = {
			AppType: 'private',
			ConsumerKey: 'myConsumerKey',
			ConsumerSecret: 'myConsumerSecret',
			PrivateKeyCert: validTestCertPath
		};

		beforeAll(() => {
			testXeroAPIClient = new TestAPIClient(xeroClientConfig);
		});

		it('sets correct options', () => {
			expect(testXeroAPIClient.state.oauthToken).toEqual(xeroClientConfig.ConsumerKey);
			expect(testXeroAPIClient.state.oauthSecret).toEqual(cert);
			expect(testXeroAPIClient.state.consumerKey).toEqual(xeroClientConfig.ConsumerKey);
			expect(testXeroAPIClient.state.oauthSecret).toEqual(cert);
			expect(testXeroAPIClient.state.signatureMethod).toEqual('RSA-SHA1');
		});
	});

	describe('when using a public app', () => {
		const xeroClientConfig: IXeroClientConfiguration = {
			AppType: 'public',
			ConsumerKey: 'myConsumerKey',
			ConsumerSecret: 'myConsumerSecret'
		};

		beforeAll(() => {

			testXeroAPIClient = new TestAPIClient(xeroClientConfig);
		});

		it('sets correct options', () => {
			expect(testXeroAPIClient.state.oauthToken).toBeNull();
			expect(testXeroAPIClient.state.oauthSecret).toBeNull();
			expect(testXeroAPIClient.state.consumerKey).toEqual(xeroClientConfig.ConsumerKey);
			expect(testXeroAPIClient.state.consumerSecret).toEqual(xeroClientConfig.ConsumerSecret);
			expect(testXeroAPIClient.state.signatureMethod).toEqual('HMAC-SHA1');
		});
	});

	describe('when using a partner app', () => {
		const xeroClientConfig: IXeroClientConfiguration = {
			AppType: 'partner',
			ConsumerKey: 'myConsumerKey',
			ConsumerSecret: 'myConsumerSecret',
			PrivateKeyCert: validTestCertPath
		};
		beforeAll(() => {
			testXeroAPIClient = new TestAPIClient(xeroClientConfig);
		});

		it('sets correct options', () => {
			expect(testXeroAPIClient.state.oauthToken).toEqual(xeroClientConfig.ConsumerKey);
			expect(testXeroAPIClient.state.oauthSecret).toEqual(cert);
			expect(testXeroAPIClient.state.consumerKey).toEqual(xeroClientConfig.ConsumerKey);
			expect(testXeroAPIClient.state.consumerSecret).toEqual(cert);
			expect(testXeroAPIClient.state.signatureMethod).toEqual('RSA-SHA1');
		});
	});

	describe('XeroApiClient\'s OAuth10a functions', () => {
		const inMemoryOAuthLib = new InMemoryOAuthLib();

		beforeAll(async () => {
			const xeroClientConfig: IXeroClientConfiguration = {
				AppType: 'partner',
				ConsumerKey: 'myConsumerKey',
				ConsumerSecret: 'myConsumerSecret',
				PrivateKeyCert: validTestCertPath
			};

			testXeroAPIClient = new TestAPIClient(xeroClientConfig, null, inMemoryOAuthLib);
		});

		describe('and building authorise url', () => {
			it('it builds the authorise url', () => {
				const unauthorisedRequestToken = '123';
				expect(testXeroAPIClient.oauth10a.buildAuthoriseUrl(unauthorisedRequestToken)).toEqual(`https://api.xero.com/oauth/Authorize?oauth_token=${unauthorisedRequestToken}`);
			});
		});

		describe('and getting unauthorisedRequestTokens', () => {
			it('it returns expected the request token', async () => {
				inMemoryOAuthLib.set_getOAuthRequestToken('aaa', 'bbb');
				const unauthRequestToken = await testXeroAPIClient.oauth10a.getUnauthorisedRequestToken();

				expect(unauthRequestToken).toMatchObject({ oauth_token: 'aaa', oauth_token_secret: 'bbb' });
			});

			it('sets expected state');
		});

		describe('and swapping request for access token', () => {
			it('returns expected accessToken', async () => {
				inMemoryOAuthLib.set_SwapRequestTokenforAccessToken(`access+token`, `access+secret`);
				const accessToken = await testXeroAPIClient.oauth10a.swapRequestTokenforAccessToken({ oauth_token: 'aaa', oauth_token_secret: 'bbb' }, '1234');

				expect(accessToken).toMatchObject({ oauth_token: `access+token`, oauth_token_secret: `access+secret` });
			});

			it('sets expected state');
		});
	});
});
