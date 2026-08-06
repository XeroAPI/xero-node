import { ApiError } from '../model/ApiError';

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
