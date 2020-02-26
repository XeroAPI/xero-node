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

describe('the XeroClient', () => {
  beforeEach(() => {
    xero.setTokenSet(tokenSet)

    nock('https://api.xero.com')
      .get('/connections')
      .reply(200, connectionsResponse);

    sinon.stub(xero.accountingApi, 'getOrganisations').returns(getOrganisationResponse);
  })

  afterEach(function () {
    sinon.restore();
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

  it('apiCallback() returns the tokenSet', async () => {
    const tenants = await xero.updateTenants()
    expect(tenants[0].orgData).toEqual(getOrganisationResponse.body.organisations[0])
  });

  // disconnect
  // refreshToken
  // refreshTokenUsingTokenSet
  // updateTenants
  // tenant
  // queryApi
})