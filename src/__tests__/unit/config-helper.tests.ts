import { validTestCertPath, testCertString } from '../test-helpers';
import { IXeroClientConfiguration } from '../../BaseAPIClient';
import { mapConfig, mapState } from '../../config-helper';

describe('config-helper', () => {
	describe('Private apps', () => {

		const xeroConfig: IXeroClientConfiguration = {
			AppType: 'private',
			ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
			ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
			PrivateKeyCert: validTestCertPath()
		};

		it('maps config correctly', () => {
			const retrievedState = mapConfig(xeroConfig);

			expect(retrievedState).toEqual({
				accept: 'application/json',
				userAgent: 'NodeJS-XeroAPIClient.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: testCertString(),
				signatureMethod: 'RSA-SHA1',
				apiBasePath: '/api.xro/2.0/',
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
			const retrievedState = mapConfig(xeroConfig);

			expect(retrievedState).toEqual({
				accept: 'application/json',
				userAgent: 'NodeJS-XeroAPIClient.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				signatureMethod: 'HMAC-SHA1',
				apiBasePath: '/api.xro/2.0/',
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
			AppType: 'private',
			ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
			ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
			PrivateKeyCert: validTestCertPath()
		};

		it('maps config correctly', () => {
			const retrievedState = mapConfig(xeroConfig);

			expect(retrievedState).toEqual({
				accept: 'application/json',
				userAgent: 'NodeJS-XeroAPIClient.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: testCertString(),
				signatureMethod: 'RSA-SHA1',
				apiBasePath: '/api.xro/2.0/',
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
});
