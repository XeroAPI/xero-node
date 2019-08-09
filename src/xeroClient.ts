import Issuer = require('openid-client');
import request = require('request');
import http = require('http');

import xero = require('./gen/api');

interface TokenSet {
    // from openid-client
    id_token: string,
    access_token: string,
    refresh_token: string,
    claims: object
}

export class XeroClient {

    readonly accountingApi: xero.AccountingApi;

    private client: any; // from openid-client
    private tokenSet?: TokenSet;

    private _tenantIds?: string[];
    get tenantIds(): string[] {
        return this._tenantIds || []; // none if not set
    }

    constructor(private readonly config: { clientId: string, clientSecret: string, redirectUris: string[], scopes: string[] }) {
        this.accountingApi = new xero.AccountingApi(); // need to set access token before use
    }

    async buildConsentUrl() {
        const issuer = await Issuer.discover('https://identity.xero.com');
        this.client = new issuer.Client({
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            redirect_uris: this.config.redirectUris,
        });

        const url = this.client.authorizationUrl({
            redirect_uri: this.config.redirectUris[0],
            scope: this.config.scopes.join(' ') || 'openid email profile'
        });

        return url;
    }

    async setAccessTokenFromRedirectUri(urlQuery: string) {
        this.tokenSet = await this.client.authorizationCallback(this.config.redirectUris[0], urlQuery);
        this.setAccessTokenForAllApis();

        await this.fetchConnectedTenantIds();
    }

    async readIdTokenClaims() {
        if (!this.tokenSet) {
            throw new Error(`Token not defined. Have you forgotten to call ${this.setAccessTokenFromRedirectUri.name}()?`);
        }
        return this.tokenSet.claims;
    }

    async refreshToken() {
        if (!this.tokenSet) {
            throw new Error('tokenSet is not defined');
        }
        this.tokenSet = await this.client.refresh(this.tokenSet.refresh_token);
        this.setAccessTokenForAllApis();

        await this.fetchConnectedTenantIds();
    }

    private setAccessTokenForAllApis() {
        if (!this.tokenSet) {
            throw new Error('Token not defined. Have you forgotten to call `setAccessTokenFromRedirectUri()`?');
        }
        const accessToken = this.tokenSet.access_token;
        this.accountingApi.accessToken = accessToken;
        // this.payrollApi.accessToken = accessToken;
        // etc.
    }

    private async fetchConnectedTenantIds() {
        // - retrieve the authorized tenants from api.xero.com/connections
        const result = await new Promise<{ response: http.IncomingMessage; body: any; }>((resolve, reject) => {
            if (!this.tokenSet) {
                reject(new Error('Token not defined. Have you forgotten to call `setAccessTokenFromRedirectUri()`?'));
            } else {
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
            }
        });

        const connections = JSON.parse(result.body);
        this._tenantIds = connections.map(connection => connection.tenantId);

        // Requests to the accounting api will look like this:
        //   let apiResponse = await xeroClient.accountingApi.getInvoices(xeroClient.tenantIds[0]);
    }
}