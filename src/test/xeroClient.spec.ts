import { XeroClient } from "../XeroClient";
const tokenSetJson = require("./mocks/tokenSet.json");
const refreshedTokenSetJson = require("./mocks/refreshedTokenSet.json");
const connectionsResponse = require("./mocks/connectionsResponse.json");
const getOrganisationResponse = require("./mocks/getOrganisationResponse.json");
import nock from 'nock';
import util from 'util';
import sinon from 'sinon';

const xero = new XeroClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUris: [`http://localhost:5000/callback`],
  scopes: 'openid profile email accounting.transactions offline_access'.split(" ")
});

const tokenSet: any = tokenSetJson
const refreshedTokenSet: any = refreshedTokenSetJson
let connect
let disconnect

describe('the XeroClient', () => {
  beforeEach(async () => {
    await xero.initialize()

    xero.setTokenSet(tokenSet)

    sinon.stub(xero.openIdClient, 'refresh').returns(refreshedTokenSet);

    sinon.stub(xero.accountingApi, 'getOrganisations').returns(getOrganisationResponse);

    connect = nock('https://api.xero.com')
      .get('/connections')
      .reply(200, connectionsResponse);

    sinon.stub(xero, 'tokenRequest').returns({ body: refreshedTokenSet });

    disconnect = nock('https://api.xero.com')
      .delete(`/connections/${connectionsResponse[0].tenantId}`)
      .reply(200, tokenSet);

    sinon.stub(xero.openIdClient, 'revoke').returns(undefined);
  })

  afterEach(() => {
    sinon.restore();
    nock.cleanAll()
  });

  describe('functions', () => {
    it('buildConsentUrl() returns the auth url', async () => {
      const authUrl = await xero.buildConsentUrl()
      expect(authUrl.substring(0, 49)).toEqual('https://login.xero.com/identity/connect/authorize')
    });

    it('buildConsentUrl() returns the state in the auth url', async () => {
      const authUrlWithoutState = await xero.buildConsentUrl()
      expect(authUrlWithoutState.includes('state=12345')).not.toEqual(true);
      const xeroWithState = new XeroClient({
        clientId: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET',
        redirectUris: [`http://localhost:5000/callback`],
        scopes: 'openid profile email accounting.transactions offline_access'.split(" "),
        state: '12345'
      });
      expect(xeroWithState.config.state).toEqual('12345');

      const authUrlWithState = await xeroWithState.buildConsentUrl();
      expect(authUrlWithState.includes('state=12345')).toEqual(true);
    });

    it('allows for the configuration of the openid-client httpTimeout', async () => {
      const xeroWithConfig = new XeroClient({
        clientId: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET',
        redirectUris: [`http://localhost:5000/callback`],
        scopes: 'openid profile email accounting.transactions offline_access'.split(" "),
        httpTimeout: 3000
      });
      const xeroClient = await xeroWithConfig.initialize()
      expect(xeroClient.config.httpTimeout).toEqual(3000)
    });

    it('allows for the configuration of the openid-client clock tolerance', async () => {
      const xeroWithConfig = new XeroClient({
        clientId: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET',
        redirectUris: [`http://localhost:5000/callback`],
        scopes: 'openid profile email accounting.transactions offline_access'.split(" "),
        clockTolerance: 10
      });
      const xeroClient = await xeroWithConfig.initialize()
      expect(xeroClient.config?.clockTolerance).toEqual(10)
    });

    it('allows for the configuration of the Xero Client for use of client credentials grant', async () => {
      const xeroCustomConnection = new XeroClient({
        clientId: 'YOUR_CLIENT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET',
        grantType: 'client_credentials'
      });
      const xeroClient = await xeroCustomConnection.initialize()
      expect(xeroClient.config.grantType).toEqual('client_credentials')
    });

    it('initialize() returns the client', async () => {
      const xeroClient = await xero.initialize()
      expect(xeroClient).toHaveProperty('accountingApi')
      expect(xeroClient).toHaveProperty('assetApi')
      expect(xeroClient).toHaveProperty('filesApi')
      expect(xeroClient).toHaveProperty('bankFeedsApi')
      expect(xeroClient).toHaveProperty('projectApi')
      expect(xeroClient).toHaveProperty('payrollAUApi')
      expect(xeroClient).toHaveProperty('payrollUKApi')
      expect(xeroClient).toHaveProperty('payrollNZApi')
      expect(xeroClient).toHaveProperty('appStoreApi')
    });

    it('readTokenSet() returns the tokenSet', async () => {
      const xeroTokenSet = await xero.readTokenSet()
      expect(xeroTokenSet).toEqual(tokenSet)
    });

    it('apiCallback() returns the tokenSet', async () => {
      const xeroTokenSet = await xero.readTokenSet()
      expect(xeroTokenSet).toEqual(tokenSet)
    });

    it('updateTenants() returns tenant data, nests orgData, & is accessible on the client', async () => {
      const tenants = await xero.updateTenants()
      expect(tenants[0].tenantName).toEqual('Demo Company (US)')
      expect(xero.tenants[0]).toEqual(tenants[0])
      expect(connect.isDone()).toBe(true)
    });

    it('updateTenants(false) returns basic /connections data accessible on the client', async () => {
      const tenants = await xero.updateTenants(false)
      expect(tenants[0].orgData).toEqual(undefined)
      expect(xero.tenants[0]).toEqual(tenants[0])
      expect(connect.isDone()).toBe(true)
    });

    it('disconnect() returns the tokenSet', async () => {
      const tokenSet = await xero.disconnect(connectionsResponse[0].tenantId)
      expect(tokenSet).toEqual(tokenSet)
      expect(disconnect.isDone()).toBe(true)
    });

    it('refreshToken() refreshes token and returns the tokenSet', async () => {
      expect(await xero.readTokenSet()).toEqual(tokenSet);
      await xero.refreshToken();
      expect(await xero.readTokenSet()).toEqual(refreshedTokenSet);
    });

    it('refreshWithRefreshToken() refreshes token with tokenSetParameter and returns the tokenSet', async () => {
      const updatedTokenSet = await xero.refreshWithRefreshToken('client_id', 'client_secret', 'refresh_token')
      expect(updatedTokenSet.id_token).toEqual(tokenSetJson.id_token)
      await xero.setTokenSet(updatedTokenSet)
      const xeroTokenSet = await xero.readTokenSet()
      expect(xeroTokenSet.id_token).toEqual(tokenSetJson.id_token)
      expect(xeroTokenSet.expires_at).toBeGreaterThan(tokenSetJson.expires_at)
    });

    it('revokeToken() revokes token and clears tokenset and tenants and returns undefined', async () => {
      expect(await xero.revokeToken()).toEqual(undefined);
      expect(xero.tenants).toEqual([]);
      expect(xero.readTokenSet()).toEqual({});
    });
  })
})

describe('XeroClient error redaction', () => {
  const clientSecret = 'client-secret-should-be-redacted';
  const refreshToken = 'refresh-token-should-be-redacted';
  const accessToken = 'access-token-should-be-redacted';
  const scopes = ['accounting.transactions'];

  const appears = (value: any, needle: string) =>
    (typeof value === 'string' ? value : JSON.stringify(value)).includes(needle) ||
    util.inspect(value, { depth: null }).includes(needle);

  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());

  it('redacts a failed client credentials request', async () => {
    nock('https://identity.xero.com').post('/connect/token').reply(401, { error: 'invalid_client' });
    const client = new XeroClient({ clientId: 'id', clientSecret, grantType: 'client_credentials', scopes });

    let error: any;
    try { await client.getClientCredentialsToken(); } catch (e) { error = e; }

    expect(error.response.status).toBe(401);
    expect(appears(error, clientSecret)).toBe(false);
    expect(appears(error, Buffer.from(`id:${clientSecret}`).toString('base64'))).toBe(false);
  });

  it('redacts a failed refresh request', async () => {
    nock('https://identity.xero.com').post('/connect/token').reply(400, { error: 'invalid_grant' });
    const client = new XeroClient({ clientId: 'id', clientSecret, scopes });

    let error: any;
    try { await client.refreshWithRefreshToken('id', clientSecret, refreshToken); } catch (e) { error = e; }

    expect(error.response.status).toBe(400);
    expect(appears(error, refreshToken)).toBe(false);
    expect(appears(error, clientSecret)).toBe(false);
  });

  it('redacts a failed connections request', async () => {
    nock('https://api.xero.com').get('/connections').reply(401, { Detail: 'AuthenticationUnsuccessful' });
    const client = new XeroClient({ clientId: 'id', clientSecret, scopes });
    client.setTokenSet({ access_token: accessToken, expires_in: 1800, token_type: 'Bearer' });

    let error: any;
    try { await client.updateTenants(false); } catch (e) { error = e; }

    expect(error.response.status).toBe(401);
    expect(appears(error, accessToken)).toBe(false);
  });
});
