import { XeroAPIClient } from '../../XeroAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { OAuthClient } from '../../OAuthClient';
import { InMemoryOAuth } from './InMenoryOAuth';

const privateKeyFile = path.resolve(__dirname + '/test-privatekey.pem');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

describe('internal state', () => {
	const inMemoryOAuth = new InMemoryOAuth();
	let xeroClient: XeroAPIClient;

	beforeAll(async () => {
		xeroClient = new XeroAPIClient({
			appType: 'private',
			consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
			consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
			privateKey: privateKey
		}, null, inMemoryOAuth);
	});

	describe('and Private apps', () => {
		it('matches intial passed in state', () => {
			const retrievedState = xeroClient.state;

			expect(retrievedState).toEqual({
				apiBasePath: '/api.xro/2.0/',
				apiBaseUrl: 'https://api.xero.com',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: privateKey,
				oauthAccessTokenPath: '/oauth/AccessToken',
				oauthRequestTokenPath: '/oauth/RequestToken',
				oauthSecret: privateKey,
				oauthToken: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				accept: 'application/json',
				signatureMethod: 'RSA-SHA1',
			});
		});
	});

	describe('when set', () => {

		const newState = {
			apiBasePath: 'test1',
			apiBaseUrl: 'test2',
			consumerKey: 'test3',
			consumerSecret: 'test4',
			oauthAccessTokenPath: 'test5',
			oauthRequestTokenPath: 'test6',
			oauthSecret: 'test7',
			oauthToken: 'test8',
			accept: 'application/json',
			signatureMethod: 'RSA-SHA1',
		};

		beforeAll(() => {
			xeroClient.state = newState;
		});

		it('matches what it was set to', () => {
			expect(xeroClient.state).toEqual(newState);
		});
	});
});

describe('parameters', () => {
	describe('and private', () => {
		it('passes correct options for OAuth', () => {

		});
	});
});
