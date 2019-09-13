import { IXeroClientConfig } from "../gen/api";

export const config: IXeroClientConfig = {
    clientId: '***REMOVED***',
    clientSecret: '***REMOVED***',
    redirectUris: [
        'http://localhost:5000/callback'
    ],
    scopes: [
        'openid', 
        'profile', 
        'email', 
        'offline_access', 
        'accounting.settings', // accounts
        'accounting.attachments'
    ]
};