import { ApiError } from '../model/ApiError';

describe('ApiError', () => {
	it('handles axios errors without a response', () => {
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
					authorization: 'Bearer token',
				}),
				method: 'GET',
			},
		});

		expect(apiError.generateError()).toEqual({
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
						authorization: 'Bearer token',
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

		expect(apiError.generateError()).toEqual({
			response: {
				statusCode: 401,
				body: {
					error: 'invalid_token',
				},
				headers: {
					'content-type': 'application/json',
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
