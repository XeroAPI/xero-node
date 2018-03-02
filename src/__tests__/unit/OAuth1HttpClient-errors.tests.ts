import { IOAuth1Configuration, OAuth1HttpClient, IOAuth1State, IOAuth1HttpClient } from '../../OAuth1HttpClient';
import { InMemoryOAuthLib } from './InMemoryOAuthLib';

describe('OAuthClient', () => {
	const oauthConfig: IOAuth1Configuration = {
		consumerKey: 'ck',
		consumerSecret: 'cs',
		apiBaseUrl: 'abu',
		apiBasePath: 'abp',
		oauthRequestTokenPath: 'ortp',
		oauthAccessTokenPath: 'oatp',
		signatureMethod: 'sigm',
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
		}
	};

	describe('when it errors', () => {

		describe('with 404s', () => {

			let oAuthHttpClient: IOAuth1HttpClient;

			beforeEach(() => {
				const inMemoryOAuth = new InMemoryOAuthLib();

				// This is what the API returns
				inMemoryOAuth.callbackResultsForNextCall({
					statusCode: 404,
					data: 'The resource you\'re looking for cannot be found'
				}, `The resource you're looking for cannot be found`, { statusCode: 404 });

				oAuthHttpClient = new OAuth1HttpClient(oauthConfig, inMemoryOAuth);
				oAuthHttpClient.setState(oauthState);
			});

			describe('on GETS', () => {
				it('the error object conforms', async () => {

					expect.assertions(2);

					try {
						await oAuthHttpClient.get('a/404/endpoint');
					} catch (error) {
						expect(error.statusCode).toBe(404);
						expect(error.body).toBe('The resource you\'re looking for cannot be found');
					}
				});
			});
			describe('on DELETES', () => {
				it('the error object conforms', async () => {
					expect.assertions(2);

					try {
						await oAuthHttpClient.delete('a/404/endpoint');
					} catch (error) {
						expect(error.statusCode).toBe(404);
						expect(error.body).toBe('The resource you\'re looking for cannot be found');
					}
				});

			});
			describe('on PUT', () => {
				it('the error object conforms', async () => {
					expect.assertions(2);

					try {
						await oAuthHttpClient.put('a/404/endpoint', { phil: 'washere' });
					} catch (error) {
						expect(error.statusCode).toBe(404);
						expect(error.body).toBe('The resource you\'re looking for cannot be found');
					}
				});

			});
		});
	});
});
