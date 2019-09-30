import { IXeroClientConfig } from "../gen/api";

export const config: IXeroClientConfig = {
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
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