import { InMemoryOAuthLibFactoryFactory } from './helpers/InMemoryOAuthLib';
import { OAuth1HttpClient, IOAuth1Configuration, IOAuth1State, IOAuth1HttpClient } from '../OAuth1HttpClient';
import { XeroError } from '../../XeroError';

describe('OAuthClient and errors', () => {
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

	describe('with 404s', () => {

		let oAuthHttpClient: IOAuth1HttpClient;

		beforeEach(() => {
			const inMemoryOAuthFF = new InMemoryOAuthLibFactoryFactory();

			// This is what the API returns
			inMemoryOAuthFF.inMemoryOAuthLib.callbackResultsForNextCall({
				statusCode: 404,
				data: 'The resource you\'re looking for cannot be found'
			}, `The resource you're looking for cannot be found`, { statusCode: 404 });

			oAuthHttpClient = new OAuth1HttpClient(oauthConfig, inMemoryOAuthFF.newFactory());

			oAuthHttpClient.setState(oauthState);
		});

		describe('on GETS', () => {
			it('the error object conforms', async () => {

				expect.assertions(3);

				try {
					await oAuthHttpClient.get('a/404/endpoint');
				} catch (error) {
					expect(error).toBeInstanceOf(XeroError);
					expect(error.statusCode).toBe(404);
					expect(error.data).toBe('The resource you\'re looking for cannot be found');
				}
			});
		});

		describe('on DELETES', () => {
			it('the error object conforms', async () => {
				expect.assertions(3);

				try {
					await oAuthHttpClient.delete('a/404/endpoint');
				} catch (error) {
					expect(error).toBeInstanceOf(XeroError);
					expect(error.statusCode).toBe(404);
					expect(error.data).toBe('The resource you\'re looking for cannot be found');
				}
			});

		});

		describe('on PUT', () => {
			it('the error object conforms', async () => {
				expect.assertions(3);

				try {
					await oAuthHttpClient.put('a/404/endpoint', { phil: 'washere' });
				} catch (error) {
					expect(error).toBeInstanceOf(XeroError);
					expect(error.statusCode).toBe(404);
					expect(error.data).toBe('The resource you\'re looking for cannot be found');
				}
			});

		});
	});
});
