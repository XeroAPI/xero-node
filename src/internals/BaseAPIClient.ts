/** @internalapi */
/** This second comment is required for typedoc to recognise the WHOLE FILE as @internalapi */

import { IOAuth1HttpClient, OAuth1HttpClient, IOAuth1Configuration } from './OAuth1HttpClient';
import { mapConfig, mapState } from './config-helper';
import * as  fs from 'fs';

/**
 * TODO: Add support for the following keys:
 *
 * - PrivateKeyPassword
 */
export interface IXeroClientConfiguration {
	appType: 'public' | 'private' | 'partner';
	consumerKey: string;
	consumerSecret: string;
	privateKeyPath?: string;
	privateKeyPassword?: string;
	callbackUrl?: string;
}

/**
 * Options specific to the API in use
 */
export interface IApiConfiguration {
	tenantType?: string;
}

export interface IHttpClient {
	get<T>(endpoint: string, headers?: { [key: string]: string }): Promise<T>;
	delete<T>(endpoint: string, headers?: { [key: string]: string }): Promise<T>;
	put<T>(endpoint: string, body: object, headers?: { [key: string]: string }): Promise<T>;
	post<T>(endpoint: string, body: object, headers?: { [key: string]: string }): Promise<T>;
	writeResponseToStream(endpoint: string, mimeType: string, writeStream: fs.WriteStream): Promise<void>;
}

export abstract class BaseAPIClient {

	public constructor(xeroConfig: IXeroClientConfiguration, apiConfig: IApiConfiguration = {}, public readonly oauth1Client: IOAuth1HttpClient = null) {
		if (!xeroConfig) {
			throw new Error('Config must be passed in when creating a new instance');
		}

		if (!this.oauth1Client) {
			const oauthConfig: IOAuth1Configuration = mapConfig(xeroConfig, apiConfig);
			this.oauth1Client = new OAuth1HttpClient(oauthConfig);
			this.oauth1Client.setState(mapState(xeroConfig)); // only affects private and partner apps
		}

	}
}
