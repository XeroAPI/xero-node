import { ApiError } from '../model/ApiError';

describe('ApiError', () => {
	it('can convert to an Error object with response details attached', () => {
		const apiError = new ApiError({
			response: {
				status: 404,
				data: 'Not Found',
				headers: {
					'content-type': 'text/plain',
				},
			},
			request: {
				protocol: 'https:',
				socket: {
					localPort: 443,
				},
				host: 'api.xero.com',
				path: '/api.xro/2.0/Invoices/not-found',
				getHeaders: () => ({}),
				method: 'GET',
			},
		});

		const error = apiError.toError();

		expect(error).toBeInstanceOf(Error);
		expect(error.name).toBe('ApiError');
		expect(error.message).toBe('Not Found');
		expect(error.response.statusCode).toBe(404);
		expect(error.body).toBe('Not Found');
	});
});
