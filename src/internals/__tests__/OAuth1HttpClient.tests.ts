import { InMemoryOAuthLibFactoryFactory } from './helpers/InMemoryOAuthLib';
import { OAuth1HttpClient, IOAuth1Configuration, IOAuth1State, IToken } from '../OAuth1HttpClient';

const requestToken: IToken = {
	oauth_token: 'test3',
	oauth_token_secret: 'test4'
};

const defaultState: IOAuth1State = {
	oauth_token: 'test7',
	oauth_token_secret: 'test8',
	oauth_session_handle: 'test9'
};

describe('OAuth1HttpClient', () => {

	const inMemoryOAuthLib = new InMemoryOAuthLibFactoryFactory();
	let oauth1HttpClient: OAuth1HttpClient;

	const oauthConfig: IOAuth1Configuration = {
		consumerKey: 'ck',
		consumerSecret: 'cs',
		tenantType: null,
		apiBaseUrl: 'abu',
		apiBasePath: 'abp',
		oauthRequestTokenPath: 'ortp',
		oauthAccessTokenPath: 'oatp',
		signatureMethod: 'RSA-SHA1',
		accept: 'acceps',
		callbackUrl: 'https://fakeurl.com/fake',
		userAgent: 'ua'
	};

	describe('and setting state', () => {

		beforeEach(() => {
			oauth1HttpClient = new OAuth1HttpClient(oauthConfig, defaultState);
		});

		it('matches what it was set to', () => {
			expect((oauth1HttpClient as any)._state).toEqual(defaultState);
		});

		it('only overrides the accessToken keys', () => {
			const client: any = oauth1HttpClient;
			client.setState({
				oauth_token: 'something new', oauth_token_secret: 'something borrowed'
			});

			expect(client._state).not.toEqual(defaultState);
			expect(client._state).toEqual({
				oauth_token: 'something new',
				oauth_token_secret: 'something borrowed',
				oauth_session_handle: 'test9'
			});
		});

		it('only overrides the oauth_session_handle keys', () => {
			const client: any = oauth1HttpClient;
			client.setState({
				oauth_session_handle: 'yoyo'
			});

			expect(client._state).not.toEqual(defaultState);
			expect(client._state).toEqual({
				oauth_token: 'test7',
				oauth_token_secret: 'test8',
				oauth_session_handle: 'yoyo'
			});
		});

	});

	describe('and building authorise url', () => {
		beforeEach(async () => {
			oauth1HttpClient = new OAuth1HttpClient(oauthConfig, defaultState, inMemoryOAuthLib.newFactory());
		});

		it('it builds the authorise url', () => {
			expect(oauth1HttpClient.buildAuthoriseUrl(requestToken)).toEqual(`abu/oauth/Authorize?oauth_token=test3`);
		});
	});

	describe('and getting RequestTokens', () => {
		let token: IToken;

		beforeEach(async () => {
			oauth1HttpClient = new OAuth1HttpClient(oauthConfig, defaultState, inMemoryOAuthLib.newFactory());
			inMemoryOAuthLib.inMemoryOAuthLib.set_getOAuthRequestToken('aaa', 'bbb');
			token = await oauth1HttpClient.getRequestToken();
		});

		it('token is returned', () => {
			expect(token.oauth_token).toBe('aaa');
			expect(token.oauth_token_secret).toBe('bbb');
		});
	});

	describe('and swapping request for access token', () => {
		let authState: IOAuth1State;

		beforeAll(async () => {
			inMemoryOAuthLib.inMemoryOAuthLib.reset();
			oauth1HttpClient = new OAuth1HttpClient(oauthConfig, defaultState, inMemoryOAuthLib.newFactory());
			inMemoryOAuthLib.inMemoryOAuthLib.set_SwapRequestTokenforAccessToken(`access+token`, `access+secret`, '1800');
			authState = await oauth1HttpClient.swapRequestTokenforAccessToken(requestToken, '1234');
		});

		it('returns and sets expected state', () => {
			const expectedState = { oauth_token: 'access+token', oauth_token_secret: 'access+secret' };
			const client = (oauth1HttpClient as any);
			expect(authState).toMatchObject(expectedState);
			expect(client._state).toMatchObject(expectedState);

			const timeObject = new Date();
			const expDate = new Date(timeObject.getTime() + (1800 * 1000));

			// Removes seconds from dates...

			expect(client._state.oauth_expires_at.setSeconds(0, 0)).toEqual(expDate.setSeconds(0, 0));

		});
	});

	describe('and refreshing authorized request token', () => {
		let authState: IOAuth1State;

		beforeAll(async () => {
			oauth1HttpClient = new OAuth1HttpClient(oauthConfig, defaultState, inMemoryOAuthLib.newFactory());

			inMemoryOAuthLib.inMemoryOAuthLib.set__performSecureRequest(`access#token`, `access#secret`, 'session#handle');
			authState = await oauth1HttpClient.refreshAccessToken();
		});

		it('returns sets expected state', () => {
			const expectedState: IOAuth1State = {
				oauth_token: `access#token`,
				oauth_token_secret: `access#secret`,
				oauth_session_handle: 'session#handle'
			};
			expect(authState).toMatchObject(expectedState);
			expect((oauth1HttpClient as any)._state).toMatchObject(expectedState);
		});
	});

	describe('and using custom headers', () => {
		const defaultHeaders = {
			'Accept': 'application/json',
			'User-Agent': 'ua'
		};

		describe('on get()', () => {

			it('uses default custom header', () => {
				oauth1HttpClient.get('someEndpoing');
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual(defaultHeaders);
			});

			it('adds a custom headers when passed in', () => {
				oauth1HttpClient.get('someEndpoing', { randomHeader: 'valuehere' });
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual({ ...defaultHeaders, ...{ randomHeader: 'valuehere' } });
			});

			it('then is back to default for next call', () => {
				oauth1HttpClient.get('someEndpoing');
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual(defaultHeaders);
			});

			it('can override default Accept type', () => {
				oauth1HttpClient.get('someEndpoing', { Accept: 'application/pea' });
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual({
					'Accept': 'application/pea',
					'User-Agent': 'ua'
				});
			});
		});

		describe('on put()', () => {
			it('uses default custom header', () => {
				oauth1HttpClient.put('someEndpoing', {});
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual(defaultHeaders);
			});

			it('adds a custom headers when passed in', () => {
				oauth1HttpClient.put('someEndpoing', {}, { randomHeader: 'valuehere' });
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual({ ...defaultHeaders, ...{ randomHeader: 'valuehere' } });
			});

			it('then is back to default for next call', () => {
				oauth1HttpClient.put('someEndpoing', {});
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual(defaultHeaders);
			});

			it('can override default Accept type', () => {
				oauth1HttpClient.put('someEndpoing', {}, { Accept: 'application/pea' });
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual({
					'Accept': 'application/pea',
					'User-Agent': 'ua'
				});
			});
		});

		describe('on post()', () => {
			it('uses default custom header', () => {
				oauth1HttpClient.post('someEndpoing', {});
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual(defaultHeaders);
			});

			it('adds a custom headers when passed in', () => {
				oauth1HttpClient.post('someEndpoing', {}, { randomHeader: 'valuehere' });
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual({ ...defaultHeaders, ...{ randomHeader: 'valuehere' } });
			});

			it('then is back to default for next call', () => {
				oauth1HttpClient.post('someEndpoing', {});
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual(defaultHeaders);
			});

			it('can override default Accept type', () => {
				oauth1HttpClient.post('someEndpoing', {}, { Accept: 'application/pea' });
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual({
					'Accept': 'application/pea',
					'User-Agent': 'ua'
				});
			});
		});

		describe('on delete()', () => {

			it('uses default custom header', () => {
				oauth1HttpClient.delete('someEndpoing');
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual(defaultHeaders);
			});

			it('adds a custom headers when passed in', () => {
				oauth1HttpClient.delete('someEndpoing', { randomHeader: 'valuehere' });
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual({ ...defaultHeaders, ...{ randomHeader: 'valuehere' } });
			});

			it('then is back to default for next call', () => {
				oauth1HttpClient.delete('someEndpoing');
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual(defaultHeaders);
			});

			it('can override default Accept type', () => {
				oauth1HttpClient.delete('someEndpoing', { Accept: 'application/pea' });
				expect(inMemoryOAuthLib.inMemoryOAuthLib._headers).toEqual({
					'Accept': 'application/pea',
					'User-Agent': 'ua'
				});
			});
		});
	});
});
