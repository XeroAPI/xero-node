"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openid_client_1 = require("openid-client");
const xero = require("./gen/api");
const request = require("request");
class XeroClient {
    constructor(config) {
        this.config = config;
        this.accountingApi = new xero.AccountingApi();
    }
    get tenantIds() {
        return this._tenantIds;
    }
    async buildConsentUrl() {
        const issuer = await openid_client_1.Issuer.discover('https://identity.xero.com');
        this.openIdClient = new issuer.Client({
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            redirect_uris: this.config.redirectUris,
        });
        this.openIdClient[openid_client_1.custom.clock_tolerance] = 5;
        const url = this.openIdClient.authorizationUrl({
            redirect_uri: this.config.redirectUris[0],
            scope: this.config.scopes.join(' ') || 'openid email profile'
        });
        return url;
    }
    async setAccessTokenFromRedirectUri(url) {
        const urlObject = new URL(url);
        let params = {};
        for (const [key, value] of urlObject.searchParams) {
            params[key] = value;
        }
        this.tokenSet = await this.openIdClient.callback(this.config.redirectUris[0], params);
        this.setAccessTokenForAllApis();
        await this.fetchConnectedTenantIds();
    }
    async readIdTokenClaims() {
        return this.tokenSet.claims();
    }
    async readTokenSet() {
        return this.tokenSet;
    }
    async setTokenSet(savedTokens) {
        this.tokenSet = savedTokens;
        this.setAccessTokenForAllApis();
    }
    async refreshToken() {
        if (!this.tokenSet) {
            throw new Error('tokenSet is not defined');
        }
        this.tokenSet = await this.openIdClient.refresh(this.tokenSet.refresh_token);
        this.setAccessTokenForAllApis();
        await this.fetchConnectedTenantIds();
    }
    setAccessTokenForAllApis() {
        const accessToken = this.tokenSet.access_token;
        if (typeof accessToken === 'undefined') {
            throw new Error('Access token is undefined!');
        }
        this.accountingApi.accessToken = accessToken;
    }
    async fetchConnectedTenantIds() {
        const result = await new Promise((resolve, reject) => {
            request({
                method: 'GET',
                uri: 'https://api.xero.com/connections',
                auth: {
                    bearer: this.tokenSet.access_token
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
        this._tenantIds = result.body.map(connection => connection.tenantId);
    }
}
exports.XeroClient = XeroClient;
//# sourceMappingURL=XeroClient.js.map