import { Issuer, TokenSet, Client, custom } from 'openid-client';
import * as xero from './gen/api';
import request = require('request');
import http = require('http');

export interface IXeroClientConfig {
  clientId: string,
  clientSecret: string,
  redirectUris: string[],
  scopes: string[],
  state?: string,
  httpTimeout?: number
};

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
};

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
};

export class XeroClient {
  constructor(readonly config?: IXeroClientConfig) {
    this.accountingApi = new xero.AccountingApi();
    this.assetApi = new xero.AssetApi();
    this.filesApi = new xero.FilesApi();
    this.projectApi = new xero.ProjectApi();
    this.payrollAUApi = new xero.PayrollAuApi();
    this.bankFeedsApi = new xero.BankFeedsApi();
    this.payrollUKApi = new xero.PayrollUkApi();
    this.payrollNZApi = new xero.PayrollNzApi();
  };

  private tokenSet: TokenSet = new TokenSet;
  private _tenants: any[] = [];

  readonly accountingApi: xero.AccountingApi;
  readonly assetApi: xero.AssetApi;
  readonly filesApi: xero.FilesApi;
  readonly projectApi: xero.ProjectApi;
  readonly payrollAUApi: xero.PayrollAuApi;
  readonly bankFeedsApi: xero.BankFeedsApi;
  readonly payrollUKApi: xero.PayrollUkApi;
  readonly payrollNZApi: xero.PayrollNzApi;

  openIdClient: Client; // from openid-client

  get tenants(): any[] {
    return this._tenants;
  }

  public async initialize() {
    if (this.config) {
      custom.setHttpOptionsDefaults({
        retry: {
          maxRetryAfter: this.config.httpTimeout || 2500
        }
      })

      const issuer = await Issuer.discover('https://identity.xero.com');
      this.openIdClient = new issuer.Client({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uris: this.config.redirectUris,
      });

      this.openIdClient[custom.clock_tolerance] = 5;
    }
    return this;
  }

  public async buildConsentUrl() {
    await this.initialize();
    let url;
    if (this.config) {
      url = this.openIdClient.authorizationUrl({
        redirect_uri: this.config.redirectUris[0],
        scope: this.config.scopes.join(' ') || 'openid email profile',
        state: this.config.state
      });
    }
    return url;
  }

  public async apiCallback(callbackUrl: string): Promise<TokenSet> {
    const params = this.openIdClient.callbackParams(callbackUrl);
    const check = { ...params };
    if (this.config.scopes.includes('openid')) {
      this.tokenSet = await this.openIdClient.callback(this.config.redirectUris[0], params, check);
    } else {
      this.tokenSet = await this.openIdClient.oauthCallback(this.config.redirectUris[0], params, check);
    }
    this.setAccessToken();
    return this.tokenSet;
  }

  public async disconnect(connectionId: string): Promise<TokenSet> {
    await this.queryApi('DELETE', `https://api.xero.com/connections/${connectionId}`);
    this.setAccessToken();
    return this.tokenSet;
  }

  public readTokenSet() {
    return this.tokenSet;
  }

  public setTokenSet(tokenSet: TokenSet) {
    this.tokenSet = tokenSet;
    this.setAccessToken();
  }

  public async refreshToken() {
    if (!this.tokenSet) {
      throw new Error('tokenSet is not defined');
    }
    const refreshedTokenSet = await this.openIdClient.refresh(this.tokenSet.refresh_token);
    this.tokenSet = refreshedTokenSet;
    this.setAccessToken();
    return this.tokenSet;
  }

  public async revokeToken() {
    if (!this.tokenSet) {
      throw new Error('tokenSet is not defined');
    }
    await this.openIdClient.revoke(this.tokenSet.refresh_token);
    this.tokenSet = new TokenSet;
    this._tenants = [];
    return;
  }

  private encodeBody(params) {
    var formBody: any = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
  }

  public formatMsDate(dateString: string) {
    const epoch = Date.parse(dateString);
    return "/Date(" + epoch + "+0000)/";
  }

  public async refreshWithRefreshToken(clientId, clientSecret, refreshToken) {
    const result = await this.postWithRefreshToken(clientId, clientSecret, refreshToken);
    const tokenSet = JSON.parse(result.body);
    this.tokenSet = tokenSet;
    this.setAccessToken();
    return this.tokenSet;
  }

  private async postWithRefreshToken(clientId, clientSecret, refreshToken) {
    const body = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };

    return new Promise<{ response: http.IncomingMessage; body: string }>((resolve, reject) => {
      request({
        method: 'POST',
        uri: 'https://identity.xero.com/connect/token',
        headers: {
          authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: this.encodeBody(body)
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

  public async updateTenants(fullOrgDetails: boolean = true) {
    const result = await this.queryApi('GET', 'https://api.xero.com/connections');
    let tenants = result.body.map(connection => connection);

    if (fullOrgDetails) {
      const getOrgsForAll = tenants.map(async tenant => {
        const result = await this.accountingApi.getOrganisations(tenant.tenantId);
        return result.body.organisations[0];
      });
      const orgData = await Promise.all(getOrgsForAll);

      tenants.map((tenant) => { // assign orgData nested under each tenant
        tenant.orgData = orgData.filter((el) => el.organisationID == tenant.tenantId)[0];
      });
    }
    // sorting tenants so the most connection / active tenant is at index 0
    tenants.sort((a: any, b: any) => <number><unknown>new Date(b.updatedDateUtc) - <number><unknown>new Date(a.updatedDateUtc));
    this._tenants = tenants;
    return tenants;
  }

  private async queryApi(method, uri) {
    return new Promise<{ response: http.IncomingMessage; body: Array<{ id: string, tenantId: string, tenantName: string, tenantType: string, orgData: any }> }>((resolve, reject) => {
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
    this.assetApi.accessToken = accessToken;
    this.filesApi.accessToken = accessToken;
    this.projectApi.accessToken = accessToken;
    this.payrollAUApi.accessToken = accessToken;
    this.bankFeedsApi.accessToken = accessToken;
    this.payrollUKApi.accessToken = accessToken;
    this.payrollNZApi.accessToken = accessToken;
  }
}
