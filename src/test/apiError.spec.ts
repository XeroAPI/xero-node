import { ApiError } from '../model/ApiError';
import { XeroClient } from '../XeroClient';
import nock from 'nock';

describe('ApiError', () => {
	it('removes sensitive headers from serialized generated errors', () => {
		const authorization = 'Bearer access-token-that-must-not-leak';
		const cookie = 'session=session-cookie-that-must-not-leak';
		const proxyAuthorization = 'Basic proxy-credentials-that-must-not-leak';
		const apiKey = 'api-key-that-must-not-leak';
		const clientSecret = 'client-secret-that-must-not-leak';
		const apiError = new ApiError({
			message: 'Network Error',
			request: {
				protocol: 'https:',
				agent: {
					defaultPort: 443,
				},
				host: 'api.xero.com',
				path: '/api.xro/2.0/Invoices',
				getHeaders: () => ({
					authorization,
					Cookie: cookie,
					'Proxy-Authorization': proxyAuthorization,
					'X-API-Key': apiKey,
					'X-Client-Secret': clientSecret,
					Accept: 'application/json',
					'X-Request-Id': 'request-id',
				}),
				method: 'GET',
			},
		});

		const serializedError = JSON.stringify(apiError.generateError());

		expect(serializedError).not.toContain(authorization);
		expect(serializedError).not.toContain(cookie);
		expect(serializedError).not.toContain(proxyAuthorization);
		expect(serializedError).not.toContain(apiKey);
		expect(serializedError).not.toContain(clientSecret);
		expect(JSON.parse(serializedError)).toEqual({
			response: {
				statusCode: 0,
				body: 'Network Error',
				headers: {},
				request: {
					url: {
						protocol: 'https:',
						port: 443,
						host: 'api.xero.com',
						path: '/api.xro/2.0/Invoices',
					},
					headers: {
						Accept: 'application/json',
						'X-Request-Id': 'request-id',
					},
					method: 'GET',
				},
			},
			body: 'Network Error',
		});
	});

	it('preserves axios response details when available', () => {
		const apiError = new ApiError({
			response: {
				status: 401,
				data: {
					error: 'invalid_token',
				},
				headers: {
					'content-type': 'application/json',
					'set-cookie': 'session=response-cookie-that-must-not-leak',
					'X-Rate-Limit-Remaining': '59',
				},
			},
			request: {
				protocol: 'https:',
				socket: {
					localPort: 443,
				},
				host: 'api.xero.com',
				path: '/api.xro/2.0/Invoices',
				getHeaders: () => ({}),
				method: 'GET',
			},
		});

		const serializedError = JSON.stringify(apiError.generateError());

		expect(serializedError).not.toContain('response-cookie-that-must-not-leak');
		expect(JSON.parse(serializedError)).toEqual({
			response: {
				statusCode: 401,
				body: {
					error: 'invalid_token',
				},
				headers: {
					'content-type': 'application/json',
					'X-Rate-Limit-Remaining': '59',
				},
				request: {
					url: {
						protocol: 'https:',
						port: 443,
						host: 'api.xero.com',
						path: '/api.xro/2.0/Invoices',
					},
					headers: {},
					method: 'GET',
				},
			},
			body: {
				error: 'invalid_token',
			},
		});
	});
});

describe('ApiError integration with XeroClient', () => {
	const clientId = 'client-id-that-must-not-leak';
	const clientSecret = 'client-secret-that-must-not-leak';
	const refreshToken = 'refresh-token-that-must-not-leak';
	const accessToken = 'access-token-that-must-not-leak';

	const buildClient = () => new XeroClient({
		clientId,
		clientSecret,
		redirectUris: ['http://localhost:5000/callback'],
		scopes: 'openid profile email offline_access'.split(' ')
	});

	const rejectionOf = (promise: Promise<any>): Promise<any> => promise.then(
		() => { throw new Error('expected the request to reject'); },
		(error) => error
	);

	afterEach(() => {
		nock.cleanAll();
	});

	it('redacts the basic auth credentials and refresh token when the token request fails', async () => {
		nock('https://identity.xero.com')
			.post('/connect/token')
			.reply(401, { error: 'invalid_grant' });

		const rejection = await rejectionOf(
			buildClient().refreshWithRefreshToken(clientId, clientSecret, refreshToken)
		);

		const serializedError = JSON.stringify(rejection);
		const basicCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

		expect(serializedError).not.toContain(basicCredentials);
		expect(serializedError).not.toContain(clientSecret);
		expect(serializedError).not.toContain(refreshToken);
		expect(JSON.parse(rejection).response.statusCode).toEqual(401);
	});

	it('redacts the bearer token when the connections query fails', async () => {
		nock('https://api.xero.com')
			.get('/connections')
			.reply(401, { Title: 'Unauthorized' });

		const client = buildClient();
		client.setTokenSet({
			access_token: accessToken,
			refresh_token: refreshToken,
			token_type: 'Bearer',
			expires_at: 1231231234
		});

		const rejection = await rejectionOf(client.updateTenants());

		const serializedError = JSON.stringify(rejection);

		expect(serializedError).not.toContain(accessToken);
		expect(serializedError).not.toContain(refreshToken);
		expect(JSON.parse(rejection).response.statusCode).toEqual(401);
	});
});
