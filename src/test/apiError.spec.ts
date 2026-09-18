import * as http from 'http';
import * as util from 'util';
import { ApiError, redactError, redactHeaders } from '../model/ApiError';

const axios = require('axios');

describe('redactHeaders', () => {
	it('removes redacted headers regardless of casing', () => {
		expect(
			redactHeaders({
				Authorization: 'Basic c2VjcmV0',
				'Set-Cookie': 'session=abc',
				COOKIE: 'session=abc',
				'proxy-authorization': 'Basic c2VjcmV0',
			})
		).toEqual({});
	});

	it('keeps the headers that are useful for debugging', () => {
		expect(
			redactHeaders({
				authorization: 'Bearer token',
				'content-type': 'application/json',
				'xero-tenant-id': 'tenant-id',
			})
		).toEqual({
			'content-type': 'application/json',
			'xero-tenant-id': 'tenant-id',
		});
	});

	it('handles a missing headers object', () => {
		expect(redactHeaders(undefined)).toEqual({});
	});
});

describe('redactError', () => {
	it('redacts the request config and replaces the live request with a summary', () => {
		const liveRequest = {
			method: 'POST',
			protocol: 'https:',
			host: 'identity.xero.com',
			path: '/connect/token',
			_header: 'POST /connect/token HTTP/1.1\r\nAuthorization: Basic c2VjcmV0\r\n\r\n',
			getHeaders: () => ({ authorization: 'Basic c2VjcmV0', accept: 'application/json' }),
		};
		const error = {
			config: { headers: { Authorization: 'Basic c2VjcmV0', Accept: 'application/json' } },
			request: liveRequest,
			response: { status: 401, request: liveRequest },
		};

		redactError(error);

		const summary = {
			method: 'POST',
			protocol: 'https:',
			host: 'identity.xero.com',
			path: '/connect/token',
			headers: { accept: 'application/json' },
		};

		expect(error.config.headers).toEqual({ Accept: 'application/json' });
		expect(error.request).toEqual(summary);
		expect(error.response.request).toEqual(summary);
		expect(JSON.stringify(error)).not.toContain('c2VjcmV0');
	});

	it('tolerates an error with nothing to redact', () => {
		expect(redactError(undefined)).toBeUndefined();
		expect(redactError({ message: 'Network Error' })).toEqual({ message: 'Network Error' });
	});

	it('redacts a real axios error while keeping it usable', async () => {
		const server = http.createServer((_request, response) => {
			response.writeHead(401, { 'content-type': 'application/json' });
			response.end('{"error":"invalid_client"}');
		});

		await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
		const { port } = server.address() as import('net').AddressInfo;
		const value = 'should-be-redacted';

		try {
			await axios({
				method: 'POST',
				url: `http://127.0.0.1:${port}/connect/token`,
				headers: {
					Authorization: `Basic ${value}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				data: 'grant_type=client_credentials',
			});
			fail('expected the request to be rejected');
		} catch (error) {
			redactError(error);

			// serialised and inspected forms
			expect(JSON.stringify(error)).not.toContain(value);
			expect(util.inspect(error, { depth: null })).not.toContain(value);

			// and the error is still useful to the caller
			expect(error.response.status).toBe(401);
			expect(error.response.data).toEqual({ error: 'invalid_client' });
		} finally {
			await new Promise<void>((resolve) => server.close(() => resolve()));
		}
	});
});

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
					'xero-tenant-id': 'tenant-id',
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
						'xero-tenant-id': 'tenant-id',
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

	it('filters the outbound request headers it copies', () => {
		const apiError = new ApiError({
			response: { status: 401, data: {}, headers: {} },
			request: {
				getHeaders: () => ({ authorization: 'Bearer should-be-redacted' }),
				method: 'GET',
			},
		});

		expect(JSON.stringify(apiError.generateError())).not.toContain('should-be-redacted');
	});
});
