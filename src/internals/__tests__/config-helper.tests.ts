import { XeroClientConfiguration, ApiConfiguration } from '../BaseAPIClient';
import { mapConfig, mapState } from '../config-helper';
import { validTestCertPath, testCertString } from './helpers/privateKey-helpers';
const version = require('../../../package.json').version;

describe('config-helper', () => {
	describe('Private apps', () => {
		describe('with cert as a path', () => {
			const xeroConfigWithCertPath: XeroClientConfiguration = {
				appType: 'private',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				privateKeyPath: validTestCertPath()
			};

			it('maps config correctly', () => {
				const retrievedState = mapConfig(xeroConfigWithCertPath, {});

				expect(retrievedState).toEqual({
					accept: 'application/json',
					userAgent: `NodeJS-XeroAPIClient.${version}.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C`,
					consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					consumerSecret: testCertString(),
					tenantType: null,
					signatureMethod: 'RSA-SHA1',
					callbackUrl: null,
					apiBaseUrl: 'https://api.xero.com',
					apiBasePath: '',
					oauthAccessTokenPath: '/oauth/AccessToken',
					oauthRequestTokenPath: '/oauth/RequestToken',
				});
			});

			it('maps state correctly', () => {
				const retrievedState = mapState(xeroConfigWithCertPath);

				expect(retrievedState).toEqual({
					oauth_token: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					oauth_token_secret: testCertString()
				});
			});
		});

		describe('with cert as a string', () => {
			const xeroConfigWithCertPath: XeroClientConfiguration = {
				appType: 'private',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				privateKeyString: testCertString()
			};

			it('maps config correctly', () => {
				const retrievedState = mapConfig(xeroConfigWithCertPath, {});

				expect(retrievedState).toEqual({
					accept: 'application/json',
					userAgent: `NodeJS-XeroAPIClient.${version}.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C`,
					consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					consumerSecret: testCertString(),
					tenantType: null,
					apiBasePath: '',
					signatureMethod: 'RSA-SHA1',
					callbackUrl: null,
					apiBaseUrl: 'https://api.xero.com',
					oauthAccessTokenPath: '/oauth/AccessToken',
					oauthRequestTokenPath: '/oauth/RequestToken',
				});
			});

			it('maps state correctly', () => {
				const retrievedState = mapState(xeroConfigWithCertPath);

				expect(retrievedState).toEqual({
					oauth_token: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					oauth_token_secret: testCertString()
				});
			});
		});

	});

	describe('Public apps', () => {

		const xeroConfig: XeroClientConfiguration = {
			appType: 'public',
			consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
			consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
			privateKeyPath: validTestCertPath()
		};

		it('maps config correctly', () => {
			const retrievedState = mapConfig(xeroConfig, {});

			expect(retrievedState).toEqual({
				accept: 'application/json',
				userAgent: `NodeJS-XeroAPIClient.${version}.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C`,
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				tenantType: null,
				apiBasePath: '',
				signatureMethod: 'HMAC-SHA1',
				callbackUrl: null,
				apiBaseUrl: 'https://api.xero.com',
				oauthAccessTokenPath: '/oauth/AccessToken',
				oauthRequestTokenPath: '/oauth/RequestToken',
			});
		});

		it('maps state correctly', () => {
			const retrievedState = mapState(xeroConfig);

			expect(retrievedState).toEqual(null);
		});
	});

	describe('Partner apps', () => {

		describe('with cert as a path', () => {
			const xeroConfig: XeroClientConfiguration = {
				appType: 'partner',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				privateKeyPath: validTestCertPath()
			};

			it('maps config correctly', () => {
				const retrievedState = mapConfig(xeroConfig, {});

				expect(retrievedState).toEqual({
					userAgent: `NodeJS-XeroAPIClient.${version}.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C`,
					accept: 'application/json',
					consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					consumerSecret: testCertString(),
					tenantType: null,
					apiBasePath: '',
					signatureMethod: 'RSA-SHA1',
					callbackUrl: null,
					apiBaseUrl: 'https://api.xero.com',
					oauthAccessTokenPath: '/oauth/AccessToken',
					oauthRequestTokenPath: '/oauth/RequestToken',
				});
			});

			it('maps state correctly', () => {
				const retrievedState = mapState(xeroConfig);

				expect(retrievedState).toEqual(null);
			});
		});

		describe('with cert as a string', () => {
			const xeroConfig: XeroClientConfiguration = {
				appType: 'partner',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				privateKeyString: testCertString()
			};

			it('maps config correctly', () => {
				const retrievedState = mapConfig(xeroConfig, {});

				expect(retrievedState).toEqual({
					accept: 'application/json',
					userAgent: `NodeJS-XeroAPIClient.${version}.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C`,
					consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					consumerSecret: testCertString(),
					tenantType: null,
					apiBasePath: '',
					signatureMethod: 'RSA-SHA1',
					callbackUrl: null,
					apiBaseUrl: 'https://api.xero.com',
					oauthAccessTokenPath: '/oauth/AccessToken',
					oauthRequestTokenPath: '/oauth/RequestToken',
				});
			});

			it('maps state correctly', () => {
				const retrievedState = mapState(xeroConfig);

				expect(retrievedState).toEqual(null);
			});
		});

	});

	describe('API Config', () => {

		describe('with cert as path', () => {
			const xeroConfig: XeroClientConfiguration = {
				appType: 'partner',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				privateKeyPath: validTestCertPath()
			};
			const apiConfig: ApiConfiguration = {
				tenantType: 'PRACTICE',
				apiBasePath: '/s/s',
			};

			it('maps config correctly', () => {
				const retrievedState = mapConfig(xeroConfig, apiConfig);

				expect(retrievedState).toEqual({
					accept: 'application/json',
					userAgent: `NodeJS-XeroAPIClient.${version}.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C`,
					consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					consumerSecret: testCertString(),
					tenantType: 'PRACTICE',
					apiBasePath: '/s/s',
					signatureMethod: 'RSA-SHA1',
					callbackUrl: null,
					apiBaseUrl: 'https://api.xero.com',
					oauthAccessTokenPath: '/oauth/AccessToken',
					oauthRequestTokenPath: '/oauth/RequestToken',
				});
			});
		});

		describe('with cert as string', () => {
			const xeroConfig: XeroClientConfiguration = {
				appType: 'partner',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				privateKeyString: testCertString()
			};
			const apiConfig: ApiConfiguration = {
				tenantType: 'PRACTICE'
			};

			it('maps config correctly', () => {
				const retrievedState = mapConfig(xeroConfig, apiConfig);

				expect(retrievedState).toEqual({
					accept: 'application/json',
					userAgent: `NodeJS-XeroAPIClient.${version}.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C`,
					consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					consumerSecret: testCertString(),
					tenantType: 'PRACTICE',
					signatureMethod: 'RSA-SHA1',
					callbackUrl: null,
					apiBasePath: '',
					apiBaseUrl: 'https://api.xero.com',
					oauthAccessTokenPath: '/oauth/AccessToken',
					oauthRequestTokenPath: '/oauth/RequestToken',
				});
			});
		});
	});
});
