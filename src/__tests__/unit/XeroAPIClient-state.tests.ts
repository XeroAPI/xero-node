import * as path from 'path';
import * as fs from 'fs';
import { InMemoryOAuthLib } from './InMemoryOAuthLib';
import { TestAPIClient } from './TestAPIClient';
import { XeroAPIClient } from '../../XeroAPIClient';

const privateKeyFile = path.resolve(__dirname + '/test-privatekey.pem');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

describe('internal state', () => {
	const inMemoryOAuth = new InMemoryOAuthLib();
	let xeroClient: XeroAPIClient;

	beforeAll(async () => {
		xeroClient = new TestAPIClient({
			AppType: 'private',
			ConsumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
			ConsumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
			PrivateKeyCert: privateKey
		}, null, inMemoryOAuth);
	});

	describe('and Private apps', () => {
		it('matches intial passed in state', () => {
			const retrievedState = xeroClient.state;

			expect(retrievedState).toEqual({
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: privateKey,
				oauthSecret: privateKey,
				oauthToken: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				signatureMethod: 'RSA-SHA1',
			});
		});
	});

	describe('when set', () => {

		const newState = {
			consumerKey: 'test3',
			consumerSecret: 'test4',
			oauthSecret: 'test7',
			oauthToken: 'test8',
			signatureMethod: 'test9',

		};

		it('matches what it was set to', () => {
			xeroClient.state = newState;
			expect(xeroClient.state).toEqual(newState);
		});

		it('only overrides the provided keys', () => {
			xeroClient.state = newState;
			xeroClient.state = { oauthSecret: 'something new' };

			expect(xeroClient.state).not.toEqual(newState);
			expect(xeroClient.state.oauthSecret).toEqual('something new');
			expect(xeroClient.state.oauthToken).toEqual(newState.oauthToken);

		});
	});
});

describe('parameters', () => {
	describe('and private', () => {
		it('passes correct options for OAuth', () => {

		});
	});
});
