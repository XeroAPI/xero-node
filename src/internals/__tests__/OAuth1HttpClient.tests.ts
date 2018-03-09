import { InMemoryOAuthLibFactoryFactory } from './helpers/InMemoryOAuthLib';
import { OAuth1HttpClient, IOAuth1Configuration, IOAuth1State } from '../OAuth1HttpClient';

const defaultState: IOAuth1State = {
	requestToken: {
		oauth_token: 'test3',
		oauth_token_secret: 'test4'
	},
	accessToken: {
		oauth_token: 'test7',
		oauth_token_secret: 'test8'
	},
	oauth_session_handle: 'test9'
};

describe('OAuth1HttpClient', () => {

	const inMemoryOAuthLib = new InMemoryOAuthLibFactoryFactory();
	let oauth1HttpClient: OAuth1HttpClient;

	const oauthConfig: IOAuth1Configuration = {
		consumerKey: 'ck',
		consumerSecret: 'cs',
		apiBaseUrl: 'abu',
		apiBasePath: 'abp',
		oauthRequestTokenPath: 'ortp',
		oauthAccessTokenPath: 'oatp',
		signatureMethod: 'sigm',
		accept: 'acceps',
		userAgent: 'ua'
	};

	describe('and setting state', () => {

		beforeEach(() => {
			oauth1HttpClient = new OAuth1HttpClient(oauthConfig, inMemoryOAuthLib.newFactory());
			oauth1HttpClient.setState(defaultState);
		});

		it('matches what it was set to', () => {
			expect(oauth1HttpClient.state).toEqual(defaultState);
		});

		it('only overrides the accessToken keys', () => {
			oauth1HttpClient.setState({
				accessToken: { oauth_token: 'something new', oauth_token_secret: 'something borrowed' }
			});

			expect(oauth1HttpClient.state).not.toEqual(defaultState);
			expect(oauth1HttpClient.state).toEqual({
				requestToken: {
					oauth_token: 'test3',
					oauth_token_secret: 'test4'
				},
				accessToken: {
					oauth_token: 'something new',
					oauth_token_secret: 'something borrowed'
				},
				oauth_session_handle: 'test9'
			});
		});

		it('only overrides the requestToken keys', () => {
			oauth1HttpClient.setState({ oauth_session_handle: 'yoyo' });

			expect(oauth1HttpClient.state).not.toEqual(defaultState);
			expect(oauth1HttpClient.state).toEqual({
				requestToken: {
					oauth_token: 'test3',
					oauth_token_secret: 'test4'
				},
				accessToken: {
					oauth_token: 'test7',
					oauth_token_secret: 'test8'
				},
				oauth_session_handle: 'yoyo'
			});
		});

		it('only overrides the oauth_session_handle keys', () => {
			oauth1HttpClient.setState({
				requestToken: { oauth_token: 'something new', oauth_token_secret: 'something borrowed' }
			});

			expect(oauth1HttpClient.state).not.toEqual(defaultState);
			expect(oauth1HttpClient.state).toEqual({
				requestToken: {
					oauth_token: 'something new',
					oauth_token_secret: 'something borrowed'
				},
				accessToken: {
					oauth_token: 'test7',
					oauth_token_secret: 'test8'
				},
				oauth_session_handle: 'test9'
			});
		});

	});

	describe('and building authorise url', () => {
		beforeEach(async () => {
			oauth1HttpClient = new OAuth1HttpClient(oauthConfig, inMemoryOAuthLib.newFactory());
			oauth1HttpClient.setState(defaultState);
		});

		it('it builds the authorise url', () => {
			expect(oauth1HttpClient.buildAuthoriseUrl()).toEqual(`https://api.xero.com/oauth/Authorize?oauth_token=test3`);
		});
	});

	describe('and getting unauthorisedRequestTokens', () => {
		beforeEach(async () => {
			oauth1HttpClient = new OAuth1HttpClient(oauthConfig, inMemoryOAuthLib.newFactory());
			inMemoryOAuthLib.inMemoryOAuthLib.set_getOAuthRequestToken('aaa', 'bbb');
			await oauth1HttpClient.getUnauthorisedRequestToken();
		});

		it('sets expected state', () => {
			const state = oauth1HttpClient.state;
			expect(state.requestToken.oauth_token).toBe('aaa');
			expect(state.requestToken.oauth_token_secret).toBe('bbb');
		});
	});

	describe('and swapping request for access token', () => {
		beforeAll(async () => {
			oauth1HttpClient = new OAuth1HttpClient(oauthConfig, inMemoryOAuthLib.newFactory());
			oauth1HttpClient.setState(defaultState);
			inMemoryOAuthLib.inMemoryOAuthLib.set_SwapRequestTokenforAccessToken(`access+token`, `access+secret`);
			await oauth1HttpClient.swapRequestTokenforAccessToken('1234');
		});

		it('sets expected state', () => {
			expect(oauth1HttpClient.state.accessToken).toMatchObject({ oauth_token: 'access+token', oauth_token_secret: 'access+secret', });
		});
	});

	describe('and refreshing authorized request token', () => {
		beforeAll(async () => {
			oauth1HttpClient = new OAuth1HttpClient(oauthConfig, inMemoryOAuthLib.newFactory());
			oauth1HttpClient.setState(defaultState);

			inMemoryOAuthLib.inMemoryOAuthLib.set__performSecureRequest(`access#token`, `access#secret`, 'session#handle');
			await oauth1HttpClient.refreshAccessToken();
		});

		it('sets expected state', () => {
			expect(oauth1HttpClient.state.oauth_session_handle).toBe('session#handle');
			expect(oauth1HttpClient.state.accessToken).toMatchObject({
				oauth_token: `access#token`,
				oauth_token_secret: `access#secret`
			});
		});
	});
});
