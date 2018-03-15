import { IXeroClientConfiguration, IApiConfiguration } from '../BaseAPIClient';
import { mapConfig, mapState } from '../config-helper';
import { validTestCertPath, testCertString } from './helpers/privateKey-helpers';

describe('config-helper', () => {
	describe('Private apps', () => {

		const xeroConfig: IXeroClientConfiguration = {
			AppType: 'private',
			ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
			ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
			PrivateKeyCert: validTestCertPath()
		};

		it('maps config correctly', () => {
			const retrievedState = mapConfig(xeroConfig, {});

			expect(retrievedState).toEqual({
				accept: 'application/json',
				userAgent: 'NodeJS-XeroAPIClient.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: testCertString(),
				tenantType: null,
				signatureMethod: 'RSA-SHA1',
				apiBasePath: '/api.xro/2.0/',
				callbackUrl: null,
				apiBaseUrl: 'https://api.xero.com',
				oauthAccessTokenPath: '/oauth/AccessToken',
				oauthRequestTokenPath: '/oauth/RequestToken',
			});
		});

		it('maps state correctly', () => {
			const retrievedState = mapState(xeroConfig);

			expect(retrievedState).toEqual({
				accessToken: {
					oauth_token: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					oauth_token_secret: testCertString()
				}
			});
		});
	});

	describe('Public apps', () => {

		const xeroConfig: IXeroClientConfiguration = {
			AppType: 'public',
			ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
			ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
			PrivateKeyCert: validTestCertPath()
		};

		it('maps config correctly', () => {
			const retrievedState = mapConfig(xeroConfig, {});

			expect(retrievedState).toEqual({
				accept: 'application/json',
				userAgent: 'NodeJS-XeroAPIClient.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				tenantType: null,
				signatureMethod: 'HMAC-SHA1',
				apiBasePath: '/api.xro/2.0/',
				callbackUrl: null,
				apiBaseUrl: 'https://api.xero.com',
				oauthAccessTokenPath: '/oauth/AccessToken',
				oauthRequestTokenPath: '/oauth/RequestToken',
			});
		});

		it('maps state correctly', () => {
			const retrievedState = mapState(xeroConfig);

			expect(retrievedState).toEqual({});
		});
	});

	describe('Partner apps', () => {

		const xeroConfig: IXeroClientConfiguration = {
			AppType: 'partner',
			ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
			ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
			PrivateKeyCert: validTestCertPath()
		};

		it('maps config correctly', () => {
			const retrievedState = mapConfig(xeroConfig, {});

			expect(retrievedState).toEqual({
				accept: 'application/json',
				userAgent: 'NodeJS-XeroAPIClient.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: testCertString(),
				tenantType: null,
				signatureMethod: 'RSA-SHA1',
				apiBasePath: '/api.xro/2.0/',
				callbackUrl: null,
				apiBaseUrl: 'https://api.xero.com',
				oauthAccessTokenPath: '/oauth/AccessToken',
				oauthRequestTokenPath: '/oauth/RequestToken',
			});
		});

		it('maps state correctly', () => {
			const retrievedState = mapState(xeroConfig);

			expect(retrievedState).toEqual({});
		});
	});

	describe('API Config', () => {

		const xeroConfig: IXeroClientConfiguration = {
			AppType: 'partner',
			ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
			ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
			PrivateKeyCert: validTestCertPath()
		};
		const apiConfig: IApiConfiguration = {
			tenantType: 'PRACTICE'
		};

		it('maps config correctly', () => {
			const retrievedState = mapConfig(xeroConfig, apiConfig);

			expect(retrievedState).toEqual({
				accept: 'application/json',
				userAgent: 'NodeJS-XeroAPIClient.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: testCertString(),
				tenantType: 'PRACTICE',
				signatureMethod: 'RSA-SHA1',
				apiBasePath: '/api.xro/2.0/',
				callbackUrl: null,
				apiBaseUrl: 'https://api.xero.com',
				oauthAccessTokenPath: '/oauth/AccessToken',
				oauthRequestTokenPath: '/oauth/RequestToken',
			});
		});

	});
});
