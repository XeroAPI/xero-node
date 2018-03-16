import { TestAPIClient } from './helpers/TestAPIClient';
import { BaseAPIClient, IXeroClientConfiguration } from '../BaseAPIClient';
import { validTestCertPath } from './helpers/privateKey-helpers';
import { XeroError } from '../../XeroError';

describe('BaseAPIClient errors', () => {
	const testError = new XeroError(101, 'the sky is blue');

	let xeroClient: BaseAPIClient;
	const getSpy = jest.fn();

	beforeAll(async () => {
		jest.resetAllMocks();

		const xeroConfig: IXeroClientConfiguration = {
			appType: 'private',
			consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
			consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
			privateKeyPath: validTestCertPath()
		};
		// TODO: Move to test utils: GetTestClient() or something

		const oAuth1HttpClientMock = {
			get: getSpy
		} as any;
		xeroClient = new TestAPIClient(xeroConfig, oAuth1HttpClientMock);
	});

	describe('bubbles Promise rejections', async () => {
		beforeAll(() => {
			getSpy.mockImplementation(() => Promise.reject(testError));
		});

		it('returns a Promise that rejects with error', () => {
			const result = xeroClient.oauth1Client.get('/any-endpoint');
			expect(result).toBeInstanceOf(Promise);
			expect(result).rejects.toBe(testError);
		});

		it('error can be caught', async () => {
			try {
				await xeroClient.oauth1Client.get('/any-endpoint');
			} catch (error) {
				expect(error).toBe(testError);
			}
		});
	});

	describe('bubbles inline errors', async () => {
		beforeAll(() => {
			getSpy.mockImplementation(() => { throw testError; });
		});

		it('throws error', () => {
			expect(() => xeroClient.oauth1Client.get('/any-endpoint')).toThrow(testError.message);
		});

		it('error can be caught', async () => {
			try {
				await xeroClient.oauth1Client.get('/any-endpoint');
			} catch (error) {
				expect(error).toBe(testError);
			}
		});
	});
});
