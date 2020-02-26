import { XeroClient } from "../gen/api"
import tokenSetJson from "./mocks/tokenSet.json"
import connectionsResponse from "./mocks/connectionsResponse.json"
import getOrganisationResponse from "./mocks/getOrganisationResponse.json"

const nock = require('nock');
const sinon = require('sinon');

const xero = new XeroClient({
	clientId: 'YOUR_CLIENT_ID',
	clientSecret: 'YOUR_CLIENT_SECRET',
	redirectUris: [`http://localhost:5000/callback`],
	scopes: 'openid profile email accounting.transactions offline_access'.split(" ")
});

const tokenSet: any = tokenSetJson
let connect
let disconnect

describe('the XeroClient', () => {
  beforeEach(() => {
    xero.setTokenSet(tokenSet)

    connect = nock('https://api.xero.com')
      .get('/connections')
      .reply(200, connectionsResponse);

    disconnect = nock('https://api.xero.com')
      .delete(`/connections/${connectionsResponse[0].tenantId}`)
      .reply(200, tokenSet);

    sinon.stub(xero.accountingApi, 'getOrganisations').returns(getOrganisationResponse);
  })

  afterEach(function () {
    sinon.restore();
    nock.cleanAll()
  });

  it('buildConsentUrl() initializes the client', async () => {
    const authUrl = await xero.buildConsentUrl() 
    expect(authUrl.substring(0,49)).toEqual('https://login.xero.com/identity/connect/authorize')
  });

  it('initialize() returns the client', async () => {
    const xeroClient = await xero.initialize()
    expect(xeroClient).toHaveProperty('accountingApi')
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
    expect(tenants[0].orgData).toEqual(getOrganisationResponse.body.organisations[0])
    expect(xero.tenants[0]).toEqual(tenants[0])
    expect(connect.isDone()).toBe(true)
  });

  it('disconnect() returns the tokenSet', async () => {
    const tokenSet = await xero.disconnect(connectionsResponse[0].tenantId)
    expect(tokenSet).toEqual(tokenSet)
    expect(disconnect.isDone()).toBe(true)
  });

  // disconnect
  // refreshToken
  // refreshTokenUsingTokenSet
  // updateTenants
  // tenant
  // queryApi
})