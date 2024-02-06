import { Client, Issuer, TokenSet, TokenSetParameters, custom } from 'openid-client';
import * as xero from './gen/api';
const axios = require('axios');
import http = require('http');

export { TokenSet, TokenSetParameters } from 'openid-client';

export interface IXeroClientConfig {
  clientId: string,
  clientSecret: string,
  redirectUris?: string[],
  grantType?: string;
  scopes?: string[],
  state?: string,
  httpTimeout?: number,
  clockTolerance?: number
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
    this.appStoreApi = new xero.AppStoreApi();
    this.financeApi = new xero.FinanceApi();
  };

  private _tokenSet: TokenSet = new TokenSet;
  private _tenants: any[] = [];

  readonly accountingApi: xero.AccountingApi;
  readonly assetApi: xero.AssetApi;
  readonly filesApi: xero.FilesApi;
  readonly projectApi: xero.ProjectApi;
  readonly payrollAUApi: xero.PayrollAuApi;
  readonly bankFeedsApi: xero.BankFeedsApi;
  readonly payrollUKApi: xero.PayrollUkApi;
  readonly payrollNZApi: xero.PayrollNzApi;
  readonly appStoreApi: xero.AppStoreApi;
  readonly financeApi: xero.FinanceApi;

  openIdClient: Client; // from openid-client

  get tenants(): any[] {
    return this._tenants;
  }

  public async initialize(): Promise<XeroClient> {
    if (this.config) {
      custom.setHttpOptionsDefaults({
        retry: {
          maxRetryAfter: this.config.httpTimeout || 3500
        },
        timeout: this.config.httpTimeout || 3500
      })

      const issuer = await Issuer.discover('https://identity.xero.com');
      this.openIdClient = new issuer.Client({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uris: this.config.redirectUris,
      });

      this.openIdClient[custom.clock_tolerance] = this.config.clockTolerance || 5;
    }
    return this;
  }

  public async buildConsentUrl(): Promise<string> {
    if (!this.openIdClient) {
      await this.initialize();
    }
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
    if (!this.openIdClient) {
      await this.initialize();
    }
    const params = this.openIdClient.callbackParams(callbackUrl);
    const check = { state: this.config.state };
    if (this.config.scopes.includes('openid')) {
      this._tokenSet = await this.openIdClient.callback(this.config.redirectUris[0], params, check);
    } else {
      this._tokenSet = await this.openIdClient.oauthCallback(this.config.redirectUris[0], params, check);
    }
    this.setAccessToken();
    return this._tokenSet;
  }

  public async disconnect(connectionId: string): Promise<TokenSet> {
    await this.queryApi('DELETE', `https://api.xero.com/connections/${connectionId}`);
    this.setAccessToken();
    return this._tokenSet;
  }

  public readTokenSet(): TokenSet {
    return this._tokenSet;
  }

  public setTokenSet(tokenSet: TokenSetParameters | TokenSet): void {
    this._tokenSet = new TokenSet(tokenSet);
    this.setAccessToken();
  }

  public async refreshToken(): Promise<TokenSet> {
    if (!this._tokenSet) {
      throw new Error('tokenSet is not defined');
    }
    const refreshedTokenSet = await this.openIdClient.refresh(this._tokenSet.refresh_token);
    this._tokenSet = new TokenSet(refreshedTokenSet);
    this.setAccessToken();
    return this._tokenSet;
  }

  public async revokeToken(): Promise<undefined> {
    if (!this._tokenSet) {
      throw new Error('tokenSet is not defined');
    }
    await this.openIdClient.revoke(this._tokenSet.refresh_token);
    this._tokenSet = new TokenSet;
    this._tenants = [];
    return;
  }

  private encodeBody(params): string {
    var formBody: any = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
  }

  public formatMsDate(dateString: string): string {
    const epoch = Date.parse(dateString);
    return "/Date(" + epoch + "+0000)/";
  }

  public async refreshWithRefreshToken(clientId, clientSecret, refreshToken): Promise<TokenSet> {
    const result = await this.tokenRequest(clientId, clientSecret, { grant_type: 'refresh_token', refresh_token: refreshToken });
    const tokenSet = result.body;
    this._tokenSet = new TokenSet(tokenSet);
    this.setAccessToken();
    return this._tokenSet;
  }

  public async getClientCredentialsToken(): Promise<TokenSet> {
    const { clientId, clientSecret, grantType, scopes } = this.config;
    const result = await this.tokenRequest(clientId, clientSecret, { grant_type: grantType, scopes });
    const tokenSet = result.body;
    this._tokenSet = new TokenSet(tokenSet);
    this.setAccessToken();
    return this._tokenSet;
  }

  private async tokenRequest(clientId, clientSecret, body): Promise<{ response: http.IncomingMessage; body: TokenSet }> {
    return new Promise<{ response: http.IncomingMessage; body: TokenSet }>(async (resolve, reject) => {
      try {
        const response = await axios({
          method: 'POST',
          url: 'https://identity.xero.com/connect/token',
          headers: {
            "Authorization": `Basic ${Buffer.from(clientId + ":" + clientSecret).toString('base64')}`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: this.encodeBody(body)
        })
        if (response.status && response.status >= 200 && response.status <= 299) {
          resolve({ response: response, body: response.data });
        } else {
          reject({ response: response, body: response.data });
        }
      }
      catch (error) {
        reject(error)
      }
    });
  }

  public async updateTenants(fullOrgDetails: boolean = true): Promise<any[]> {
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

  private async queryApi(method, uri): Promise<{ response: http.IncomingMessage; body: Array<{ id: string, tenantId: string, tenantName: string, tenantType: string, orgData: any }> }> {
    return new Promise<{ response: http.IncomingMessage; body: Array<{ id: string, tenantId: string, tenantName: string, tenantType: string, orgData: any }> }>(async (resolve, reject) => {
      try {
        const response = await axios({
          method,
          url: uri,
          headers: { "Authorization": `Bearer ${this._tokenSet.access_token}` },
          responseType: 'json'
        })
        if (response.status && response.status >= 200 && response.status <= 299) {
          resolve({ response: response, body: response.data });
        } else {
          reject({ response: response, body: response.data });
        }
      }
      catch (error) {
        reject(error)
      }
    });
  }

  private setAccessToken(): void {
    const accessToken = this._tokenSet.access_token;
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
    this.appStoreApi.accessToken = accessToken;
    this.financeApi.accessToken = accessToken;
  }
}
