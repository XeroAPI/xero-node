import { FilesApi } from '../filesApi';
jest.mock('request');

const localVarRequest = require('request');
const fileAPI = new FilesApi();

describe('gen.api.filesApi', () => {
	describe('createFileAssociation function', () => {
		it('header will contain Idempotency-Key if call this with idempotencyKey params', async () => {
			localVarRequest.mockRestore();
			localVarRequest.mockImplementation((args, callback) => {
				callback(null, { statusCode: 200 }, { data: 'mock return data' });
			});
			await fileAPI.createFileAssociation('test-xeroTenantId', 'test-fileId', 'test-idempotencyKey');
			expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(true);
		});
		it('header will not contain Idempotency-Key if call this without idempotencyKey params', async () => {
			localVarRequest.mockRestore();
			localVarRequest.mockImplementation((args, callback) => {
				callback(null, { statusCode: 200 }, { data: 'mock return data' });
			});
			await fileAPI.createFileAssociation('test-xeroTenantId', 'test-fileId', null);
			expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(false);
		});
	});
});
