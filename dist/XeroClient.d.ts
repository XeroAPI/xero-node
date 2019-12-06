/// <reference path="untyped.d.ts" />
import { TokenSet } from 'openid-client';
import * as xero from './gen/api';
export interface IXeroClientConfig {
    clientId: string;
    clientSecret: string;
    redirectUris: string[];
    scopes: string[];
}
export declare class XeroClient {
    private readonly config;
    readonly accountingApi: xero.AccountingApi;
    private openIdClient;
    private tokenSet;
    private _tenantIds;
    get tenantIds(): string[];
    constructor(config: IXeroClientConfig);
    buildConsentUrl(): Promise<any>;
    setAccessTokenFromRedirectUri(url: string): Promise<void>;
    readIdTokenClaims(): Promise<import("openid-client").IdTokenClaims>;
    readTokenSet(): Promise<TokenSet>;
    setTokenSet(savedTokens: TokenSet): Promise<void>;
    refreshToken(): Promise<void>;
    private setAccessTokenForAllApis;
    private fetchConnectedTenantIds;
}
