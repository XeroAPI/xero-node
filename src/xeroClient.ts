import { Issuer } from 'openid-client';
import * as xero from './gen/api';
//import xero = require('./gen/api');
import request = require('request');
import http = require('http');

export class XeroClient {

    readonly accountingApi: xero.AccountingApi;

    private client: any; // from openid-client
    private tokenSet: { id_token: string, access_token: string, refresh_token: string, claims: object }; // from openid-client

    private _tenantIds: string[];
    get tenantIds(): string[] {
        return this._tenantIds;
    }

    constructor(private readonly config: { clientId: string, clientSecret: string, redirectUris: string[], scopes: string[] }) {
        this.accountingApi = new xero.AccountingApi(); // need to set access token before use
    }

    async buildConsentUrl() {
        const issuer = await Issuer.discover('https://identity.xero.com');
        this.openIdClient = new issuer.Client({
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            redirect_uris: this.config.redirectUris,
        });
        this.client.CLOCK_TOLERANCE = 5; // to allow a 5 second skew in the openid-client validations
      

        const url = this.openIdClient.authorizationUrl({
            redirect_uri: this.config.redirectUris[0],
            scope: this.config.scopes.join(' ') || 'openid email profile'
        });

        return url;
    }

    async setAccessTokenFromRedirectUri(urlQuery: string) {
        this.tokenSet = await this.client.callback(this.config.redirectUris[0], urlQuery);
        this.setAccessTokenForAllApis();

        await this.fetchConnectedTenantIds();
    }

    async readIdTokenClaims() {
        return this.tokenSet.claims;
    }

    async refreshToken() {

        if (!this.tokenSet) {
            throw new Error('tokenSet is not defined');
        }
        this.tokenSet = await this.openIdClient.refresh(this.tokenSet.refresh_token);
        this.setAccessTokenForAllApis();
        
        await this.fetchConnectedTenantIds();
    }

    private setAccessTokenForAllApis() {
        const accessToken = this.tokenSet.access_token;
        this.accountingApi.accessToken = accessToken;
        // this.payrollApi.accessToken = accessToken;
        // etc.
    }

    private async fetchConnectedTenantIds() {
        // - retrieve the authorized tenants from api.xero.com/connections
        const result = await new Promise<{ response: http.IncomingMessage; body: any; }>((resolve, reject) => {
            request({
                method: 'GET',
                uri: 'https://api.xero.com/connections',
                auth: {
                    bearer: this.tokenSet.access_token
                }
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

        const connections = JSON.parse(result.body);
        this._tenantIds = connections.map(connection => connection.tenantId);

        // Requests to the accounting api will look like this:
        //   let apiResponse = await xeroClient.accountingApi.getInvoices(xeroClient.tenantIds[0]);
    }
}