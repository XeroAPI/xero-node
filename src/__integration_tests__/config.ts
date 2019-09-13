import { IXeroClientConfig } from "../gen/api";

export const config: IXeroClientConfig = {
    clientId: 'YOUR-CLIENT_ID',
    clientSecret: 'YOUR-CLIENT_ID',
    redirectUris: [
        'YOUR-REDIRECT_URI'
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