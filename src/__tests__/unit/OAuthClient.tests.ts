import { IOAuthClientConfiguration, OAuthClient, IHttpError } from '../../OAuthClient';
import { InMemoryOAuth } from './InMenoryOAuth';

describe('OAuthClient', () => {
	const testConfig: IOAuthClientConfiguration = {
		consumerKey: 'ck',
		consumerSecret: 'cs',
		oauthSecret: 'os',
		oauthToken: 'ot'
	};

	describe('when it errors', () => {
		describe('on GETS', () => {
			describe('with 404s', () => {
				it('the error object conforms', async () => {
					const inMemoryOAuth = new InMemoryOAuth();

					// This is what the API returns
					inMemoryOAuth.callbackResultsForNextCall({
						statusCode: 404,
						data: 'The resource you\'re looking for cannot be found'
					}, `The resource you're looking for cannot be found`, { statusCode: 404 });

					const oAuth = new OAuthClient(testConfig, inMemoryOAuth);

					expect.assertions(3);

					try {
						await oAuth.get('a/404/endpoint');
					} catch (error) {
						expect(error.statusCode).toBe(404);
						expect(error.body).toBe('The resource you\'re looking for cannot be found');
						expect(error.error).toMatchObject({
							statusCode: 404,
							data: 'The resource you\'re looking for cannot be found'
						});
					}
				});
			});

		});
		describe('on DELETES', () => {
			describe('with 404s', () => {
				it('the error object conforms', async () => {
					const inMemoryOAuth = new InMemoryOAuth();

					// This is what the API returns
					inMemoryOAuth.callbackResultsForNextCall({
						statusCode: 404,
						data: 'The resource you\'re looking for cannot be found'
					}, `The resource you're looking for cannot be found`, { statusCode: 404 });

					const oAuth = new OAuthClient(testConfig, inMemoryOAuth);

					expect.assertions(3);

					try {
						await oAuth.delete('a/404/endpoint');
					} catch (error) {
						expect(error.statusCode).toBe(404);
						expect(error.body).toBe('The resource you\'re looking for cannot be found');
						expect(error.error).toMatchObject({
							statusCode: 404,
							data: 'The resource you\'re looking for cannot be found'
						});
					}
				});
			});

		});
		describe('on PUT', () => {
			describe('with 404s', () => {
				it('the error object conforms', async () => {
					const inMemoryOAuth = new InMemoryOAuth();

					// This is what the API returns
					inMemoryOAuth.callbackResultsForNextCall({
						statusCode: 404,
						data: 'The resource you\'re looking for cannot be found'
					}, `The resource you're looking for cannot be found`, { statusCode: 404 });

					const oAuth = new OAuthClient(testConfig, inMemoryOAuth);

					expect.assertions(3);

					try {
						await oAuth.put('a/404/endpoint', { phil: 'washere' });
					} catch (error) {
						expect(error.statusCode).toBe(404);
						expect(error.body).toBe('The resource you\'re looking for cannot be found');
						expect(error.error).toMatchObject({
							statusCode: 404,
							data: 'The resource you\'re looking for cannot be found'
						});
					}
				});
			});

		});
	});
});
