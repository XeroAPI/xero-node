import { Issuer, TokenSet, custom } from 'openid-client';
import * as xero from './gen/api';
import request = require('request');
import http = require('http');

export interface IXeroClientConfig {
  clientId: string,
  clientSecret: string,
  redirectUris: string[],
  scopes: string[],
  state?: string
}
export interface XeroIdToken {
  nbf: number
  exp: number
  iss: string,
  aud: string
  iat: number
  at_hash: string
  sid: string
  sub: string
  auth_time: number
  idp: string
  xero_userid: string
  global_session_id: string
  preferred_username: string
  email: string
  given_name: string
  family_name: string
  amr: string[]
}

export interface XeroAccessToken {
  nbf: number
  exp: number
  iss: string
  aud: string
  client_id: string
  sub: string
  auth_time: number
  idp: string
  xero_userid: string
  global_session_id: string
  jti: string
  scope: string[]
  amr: string[]
}

export class XeroClient {
  constructor(private readonly config: IXeroClientConfig) {
    this.accountingApi = new xero.AccountingApi(); 
  }

  private tokenSet: TokenSet = new TokenSet
  private _tenants: any[] = []

  readonly accountingApi: xero.AccountingApi;

  openIdClient: any; // from openid-client
  
  get tenants(): any[] {
    return this._tenants;
  }
  
  async initialize() {
    const issuer = await Issuer.discover('https://identity.xero.com');
    this.openIdClient = new issuer.Client({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uris: this.config.redirectUris,
    });
    this.openIdClient[custom.clock_tolerance] = 5
    return this
  }

  async buildConsentUrl() {
    await this.initialize()
    const url = this.openIdClient.authorizationUrl({
      redirect_uri: this.config.redirectUris[0],
      scope: this.config.scopes.join(' ') || 'openid email profile'
    });
    return url;
  }

  async apiCallback(url: string): Promise<TokenSet> {
    const params = this.openIdClient.callbackParams(url)
    const check = {...params}
    this.tokenSet = await this.openIdClient.callback(this.config.redirectUris[0], params, check);
    this.setAccessToken();
    return this.tokenSet
  }

  async disconnect(tenantId: string): Promise<TokenSet> {
    await this.queryApi('DELETE', `https://api.xero.com/connections/${tenantId}`)
    this.setAccessToken();
    return this.tokenSet
  }

  readIdTokenClaims() {
    return this.tokenSet.claims();
  }

  readTokenSet() {
    return this.tokenSet;
  }

  setTokenSet(tokenSet: TokenSet) {
    this.tokenSet = tokenSet;
    this.setAccessToken();
  }

  async refreshToken() {
    if (!this.tokenSet) {
      throw new Error('tokenSet is not defined');
    }
    this.tokenSet = await this.openIdClient.refresh(this.tokenSet.refresh_token);
    this.setAccessToken();
    return this.tokenSet
  }

  async refreshTokenUsingTokenSet(tokenSet: TokenSet) {
    this.tokenSet = await this.openIdClient.refresh(tokenSet.refresh_token);
    this.setAccessToken();
    return this.tokenSet
  }
  
  async updateTenants() {
    const result = await this.queryApi('GET', 'https://api.xero.com/connections')
    let tenants = result.body.map(connection => connection)
    
    const getOrgsForAll = tenants.map(async tenant => {
      const result = await this.accountingApi.getOrganisations(tenant.tenantId)      
      return result.body.organisations[0]
    })
    const orgData = await Promise.all(getOrgsForAll)

    tenants.map((tenant) => { // assign orgData nested under each tenant
      tenant.orgData = orgData.filter((el) => el.organisationID == tenant.tenantId)[0]
    })
    this._tenants = tenants;
    return tenants
  }

  async queryApi(method, uri) {
    return new Promise<{ response: http.IncomingMessage; body: Array<{ id: string, tenantId: string, tenantType: string, orgData: any }> }>((resolve, reject) => {
      request({
        method,
        uri,
        auth: {
          bearer: this.tokenSet.access_token
        },
        json: true
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
            resolve({ response: response, body: body });
          } else {
            reject({ response: response, body: body });
          }
        }
      });
    });
  }

  private setAccessToken() {
    const accessToken = this.tokenSet.access_token;
    if (typeof accessToken === 'undefined') {
      throw new Error('Access token is undefined!');
    }
    
    this.accountingApi.accessToken = accessToken;
    // this.payrollApi.accessToken = accessToken;
  }
}
