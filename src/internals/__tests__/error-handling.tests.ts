import { TestAPIClient } from './helpers/TestAPIClient';
import { BaseAPIClient, XeroClientConfiguration, AppType } from '../BaseAPIClient';
import { validTestCertPath } from './helpers/privateKey-helpers';
import { XeroError } from '../../XeroError';
import { OAuth1HttpClient, OAuth1Configuration, AccessToken, RequestToken } from '../OAuth1HttpClient';
import { InMemoryOAuthLibFactoryFactory } from './helpers/InMemoryOAuthLib';

describe('HTTP errors', () => {
	const testError = new XeroError(101, 'the sky is blue', null);

	const inMemoryOAuthFF = new InMemoryOAuthLibFactoryFactory();
	let xeroClient: BaseAPIClient;

	const oauthConfig: OAuth1Configuration = {
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
	const requestToken: RequestToken = {
		oauth_token: 'reqtoken',
		oauth_token_secret: 'reqsecret',
	};
	const oauthState: AccessToken = {
		oauth_token: 'atoken',
		oauth_token_secret: 'asecret',
		oauth_session_handle: 'sessionHandle'
	};
	const xeroConfig: XeroClientConfiguration = {
		appType: AppType.Private,
		consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
		consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
		privateKeyPath: validTestCertPath()
	};

	beforeAll(async () => {
		const oAuth1HttpClient = new OAuth1HttpClient(oauthConfig, oauthState, inMemoryOAuthFF.newFactory());
		xeroClient = new TestAPIClient(xeroConfig, null, oAuth1HttpClient);
	});

	interface IFixture {
		verb: string;
		underlyingMethod?: string;
		methodUnderTest: () => Promise<any>;
	}

	const fixtures: IFixture[] = [
		{ verb: 'get', methodUnderTest: () => xeroClient.oauth1Client.get('/any-endpoint') },
		{ verb: 'put', methodUnderTest: () => xeroClient.oauth1Client.put('/any-endpoint', { body: 'b' }) },
		{ verb: 'post', methodUnderTest: () => xeroClient.oauth1Client.post('/any-endpoint', { body: 'b' }) },
		{ verb: 'delete', methodUnderTest: () => xeroClient.oauth1Client.delete('/any-endpoint') },
		// TODO { verb: 'writeUTF8ResponseToStream', underlyingMethod: 'get', methodUnderTest: () => xeroClient.oauth1Client.writeUTF8ResponseToStream('/any-endpoint', 'mime/type', null) },
		{ verb: 'getUnauthorisedRequestToken', underlyingMethod: 'getOAuthRequestToken', methodUnderTest: () => xeroClient.oauth1Client.getRequestToken() },
		{ verb: 'swapRequestTokenforAccessToken', underlyingMethod: 'getOAuthAccessToken', methodUnderTest: () => xeroClient.oauth1Client.swapRequestTokenforAccessToken(requestToken, 'any-token') },
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
