import { InMemoryOAuthLib } from './InMemoryOAuthLib';
import { OAuth1HttpClient, IOAuth1Configuration, IOAuth1State } from '../../OAuth1HttpClient';

describe('OAuth1HttpClient', () => {

	const inMemoryOAuthLib = new InMemoryOAuthLib();
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

	beforeEach(() => {
		oauth1HttpClient = new OAuth1HttpClient(oauthConfig, inMemoryOAuthLib);
	});

	describe('set state', () => {

		const defaultState: IOAuth1State = {
			requestToken: {
				oauth_token: 'test3',
				oauth_token_secret: 'test4'
			},
			accessToken: {
				oauth_token: 'test7',
				oauth_token_secret: 'test8'
			}
		};

		it('matches what it was set to', () => {
			oauth1HttpClient.setState(defaultState);
			expect(oauth1HttpClient.state).toEqual(defaultState);
		});

		it('only overrides the provided keys', () => {
			oauth1HttpClient.setState(defaultState);
			oauth1HttpClient.setState({
				accessToken: { oauth_token: 'something new', oauth_token_secret: 'something borrowed' }
			});

			expect(oauth1HttpClient.state).not.toEqual(defaultState);
			expect(oauth1HttpClient.state.requestToken).toEqual({ oauth_token: 'test3', oauth_token_secret: 'test4' });
			expect(oauth1HttpClient.state.accessToken).toEqual({ oauth_token: 'something new', oauth_token_secret: 'something borrowed' });
		});

	});

	describe('and building authorise url', () => {
		it('it builds the authorise url', () => {
			const unauthorisedRequestToken = '123';
			expect(oauth1HttpClient.buildAuthoriseUrl(unauthorisedRequestToken)).toEqual(`https://api.xero.com/oauth/Authorize?oauth_token=${unauthorisedRequestToken}`);
		});
	});

	describe('and getting unauthorisedRequestTokens', () => {
		it('it returns expected the request token', async () => {
			inMemoryOAuthLib.set_getOAuthRequestToken('aaa', 'bbb');
			const unauthRequestToken = await oauth1HttpClient.getUnauthorisedRequestToken();

			expect(unauthRequestToken).toMatchObject({ oauth_token: 'aaa', oauth_token_secret: 'bbb' });
		});

		it('sets expected state');
	});

	describe('and swapping request for access token', () => {
		it('returns expected accessToken', async () => {
			inMemoryOAuthLib.set_SwapRequestTokenforAccessToken(`access+token`, `access+secret`);
			const accessToken = await oauth1HttpClient.swapRequestTokenforAccessToken({ oauth_token: 'aaa', oauth_token_secret: 'bbb' }, '1234');

			expect(accessToken).toMatchObject({ oauth_token: `access+token`, oauth_token_secret: `access+secret` });
		});

		it('sets expected state');
	});
});
