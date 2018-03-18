import { TestAPIClient } from './helpers/TestAPIClient';
import { BaseAPIClient, IXeroClientConfiguration } from '../BaseAPIClient';
import { validTestCertPath } from './helpers/privateKey-helpers';
import { XeroError } from '../../XeroError';
import { OAuth1HttpClient, IOAuth1Configuration, IOAuth1State } from '../OAuth1HttpClient';
import { InMemoryOAuthLibFactoryFactory } from './helpers/InMemoryOAuthLib';

describe('HTTP errors', () => {
	const testError = new XeroError(101, 'the sky is blue');

	const inMemoryOAuthFF = new InMemoryOAuthLibFactoryFactory();
	let xeroClient: BaseAPIClient;

	beforeAll(async () => {
		const oauthConfig: IOAuth1Configuration = {
			consumerKey: 'ck',
			consumerSecret: 'cs',
			tenantType: null,
			apiBaseUrl: 'abu',
			apiBasePath: 'abp',
			oauthRequestTokenPath: 'ortp',
			oauthAccessTokenPath: 'oatp',
			signatureMethod: 'sigm',
			callbackUrl: 'http://sdf.sdf',
			accept: 'acceps',
			userAgent: 'ua'
		};
		const oauthState: IOAuth1State = {
			requestToken: {
				oauth_token: 'reqtoken',
				oauth_token_secret: 'reqsecret',
			},
			accessToken: {
				oauth_token: 'atoken',
				oauth_token_secret: 'asecret',
			},
			oauth_session_handle: 'sessionHandle'
		};
		const xeroConfig: IXeroClientConfiguration = {
			appType: 'private',
			consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
			consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
			privateKeyPath: validTestCertPath()
		};

		const oAuth1HttpClient = new OAuth1HttpClient(oauthConfig, inMemoryOAuthFF.newFactory());
		oAuth1HttpClient.setState(oauthState);

		xeroClient = new TestAPIClient(xeroConfig, oAuth1HttpClient);
	});

	interface IFixture {
		verb: string;
		underlyingMethod?: string;
		methodUnderTest: () => Promise<void>;
	}

	const fixtures: IFixture[] = [
		{ verb: 'get', methodUnderTest: () => xeroClient.oauth1Client.get('/any-endpoint') },
		{ verb: 'put', methodUnderTest: () => xeroClient.oauth1Client.put('/any-endpoint', { body: 'b' }) },
		{ verb: 'post', methodUnderTest: () => xeroClient.oauth1Client.post('/any-endpoint', { body: 'b' }) },
		{ verb: 'delete', methodUnderTest: () => xeroClient.oauth1Client.delete('/any-endpoint') },
		// TODO { verb: 'writeResponseToStream', underlyingMethod: 'get', methodUnderTest: () => xeroClient.oauth1Client.writeResponseToStream('/any-endpoint', 'mime/type', null) },
		{ verb: 'getUnauthorisedRequestToken', underlyingMethod: 'getOAuthRequestToken', methodUnderTest: () => xeroClient.oauth1Client.getUnauthorisedRequestToken() },
		{ verb: 'swapRequestTokenforAccessToken', underlyingMethod: 'getOAuthAccessToken', methodUnderTest: () => xeroClient.oauth1Client.swapRequestTokenforAccessToken('any-token') },
		{ verb: 'refreshAccessToken', underlyingMethod: '_performSecureRequest', methodUnderTest: () => xeroClient.oauth1Client.refreshAccessToken() }
	];

	fixtures.map((fixture) => {
		describe(fixture.verb, () => {
			beforeEach(() => {
				inMemoryOAuthFF.inMemoryOAuthLib.reset();
				inMemoryOAuthFF.inMemoryOAuthLib.setResponse(true, testError.data, { statusCode: testError.statusCode });
			});

			it('calls correct verb and rejects with XeroError', () => {
				const result = fixture.methodUnderTest();

				expect(result).toBeInstanceOf(Promise);
				expect(result).rejects.toEqual(testError);

				inMemoryOAuthFF.inMemoryOAuthLib.lastCalledThisMethod(fixture.underlyingMethod || fixture.verb);
			});
		});
	});
});
