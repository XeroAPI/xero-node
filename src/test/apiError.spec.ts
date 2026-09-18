import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import * as util from 'util';
import { ApiError, redactError, redactHeaders, redactIdentityError } from '../model/ApiError';

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

	it('drops headers it does not know, including caller supplied ones', () => {
		expect(
			redactHeaders({
				'x-api-key': 'k',
				'X-Request-Id': 'r',
				'content-type': 'application/json',
				'Idempotency-Key': 'order-42',
			})
		).toEqual({
			'content-type': 'application/json',
			'Idempotency-Key': 'order-42',
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

	it('passes non-object rejections through untouched', () => {
		expect(redactError('boom')).toBe('boom');
		expect(redactError(42)).toBe(42);
	});

	it('drops the request body and the axios auth option', () => {
		const error = {
			config: {
				headers: { Accept: 'application/json' },
				data: 'grant_type=refresh_token&refresh_token=c2VjcmV0',
				auth: { username: 'id', password: 'c2VjcmV0' },
			},
		};

		redactError(error);

		expect(error.config).toEqual({ headers: { Accept: 'application/json' } });
	});

	it('handles a plain { response, body } rejection', () => {
		const liveRequest = {
			method: 'POST',
			path: '/connect/token',
			getHeaders: () => ({ authorization: 'Basic c2VjcmV0', host: 'identity.xero.com' }),
		};
		const error = {
			response: {
				status: 401,
				config: { headers: { Authorization: 'Basic c2VjcmV0' }, data: 'grant_type=client_credentials' },
				request: liveRequest,
			},
			body: { error: 'invalid_client' },
		};

		redactError(error);

		expect(error.response.config).toEqual({ headers: {} });
		expect(error.response.request).toEqual({
			method: 'POST',
			protocol: undefined,
			host: undefined,
			path: '/connect/token',
			headers: { host: 'identity.xero.com' },
		});
		expect(JSON.stringify(error)).not.toContain('c2VjcmV0');
	});

	it('redacts a real axios error while keeping it usable', async () => {
		const server = http.createServer((_request, response) => {
			response.writeHead(401, { 'content-type': 'application/json' });
			response.end('{"error":"invalid_client"}');
		});

		await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
		const { port } = server.address() as import('net').AddressInfo;
		const value = 'should-be-redacted';
		axios.defaults.headers.common['X-Api-Key'] = `global-${value}`;

		try {
			await axios({
				method: 'POST',
				url: `http://127.0.0.1:${port}/connect/token`,
				headers: {
					Authorization: `Basic ${value}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				data: `grant_type=refresh_token&refresh_token=${value}`,
			});
			throw new Error('expected the request to be rejected');
		} catch (error) {
			redactError(error);

			expect(JSON.stringify(error)).not.toContain(value);
			expect(util.inspect(error, { depth: null })).not.toContain(value);

			expect(error.response.status).toBe(401);
			expect(error.response.data).toEqual({ error: 'invalid_client' });
			expect(error.request.headers['content-type']).toBe('application/x-www-form-urlencoded');
		} finally {
			delete axios.defaults.headers.common['X-Api-Key'];
			await new Promise<void>((resolve) => server.close(() => resolve()));
		}
	});
});

describe('redactIdentityError', () => {
	it('replaces the live request on an identity error with a summary', () => {
		const error: any = new Error('invalid_client');
		Object.defineProperty(error, 'response', {
			value: {
				statusCode: 401,
				body: { error: 'invalid_client' },
				req: {
					method: 'POST',
					path: '/connect/token',
					_header: 'POST /connect/token HTTP/1.1\r\nauthorization: Basic c2VjcmV0\r\n\r\n',
					getHeaders: () => ({ authorization: 'Basic c2VjcmV0', accept: 'application/json' }),
				},
			},
		});

		redactIdentityError(error);

		expect(error.response.statusCode).toBe(401);
		expect(error.response.req).toEqual({
			method: 'POST',
			protocol: undefined,
			host: undefined,
			path: '/connect/token',
			headers: { accept: 'application/json' },
		});
		expect(util.inspect(error, { depth: null, showHidden: true })).not.toContain('c2VjcmV0');
	});

	it('leaves errors without a live request alone', () => {
		expect(redactIdentityError('boom')).toBe('boom');
		expect(redactIdentityError({ message: 'x' })).toEqual({ message: 'x' });
	});
});

describe('redactHeaders against the generated code', () => {
	it('keeps every header parameter the generated API methods set', () => {
		const apiDir = path.join(__dirname, '..', 'gen', 'api');
		const pattern = /localVarHeaderParams\['([^']+)'\]/g;
		const names: string[] = [];

		fs.readdirSync(apiDir)
			.filter((file) => file.endsWith('.ts'))
			.forEach((file) => {
				const source = fs.readFileSync(path.join(apiDir, file), 'utf8');
				let match = pattern.exec(source);
				while (match) {
					if (names.indexOf(match[1]) === -1) {
						names.push(match[1]);
					}
					match = pattern.exec(source);
				}
			});

		expect(names.length).toBeGreaterThan(0);
		names.forEach((name) => {
			expect(redactHeaders({ [name]: 'value' })).toEqual({ [name]: 'value' });
		});
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
