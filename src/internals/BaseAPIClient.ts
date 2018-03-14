/** @internalapi */
/** This second comment is required for typedoc to recognise the WHOLE FILE as @internalapi */

import { IOAuth1HttpClient, OAuth1HttpClient, IOAuth1Configuration } from './OAuth1HttpClient';
import { mapConfig, mapState } from './config-helper';
import * as  fs from 'fs';

/**
 * TODO: Add support for the following keys:
 *
 * - PrivateKeyPassword
 * - CallbackPath
 */
export interface IXeroClientConfiguration {
	AppType: 'public' | 'private' | 'partner';
	ConsumerKey: string;
	ConsumerSecret: string;
	PrivateKeyCert?: string;
	PrivateKeyPassword?: string;
	CallbackUrl?: string;
}

export interface IHttpClient {
	get<T>(endpoint: string, acceptType?: string): Promise<T>;
	delete<T>(endpoint: string): Promise<T>;
	put<T>(endpoint: string, body: object): Promise<T>;
	post<T>(endpoint: string, body: object): Promise<T>;
	writeResponseToStream(endpoint: string, mimeType: string, writeStream: fs.WriteStream): Promise<void>;
}

export abstract class BaseAPIClient {

	public constructor(xeroConfig: IXeroClientConfiguration, public readonly oauth1Client?: IOAuth1HttpClient) {
		if (!xeroConfig) {
			throw new Error('Config must be passed in when creating a new instance');
		}

		if (!this.oauth1Client) {
			const oauthConfig: IOAuth1Configuration = mapConfig(xeroConfig);
			this.oauth1Client = new OAuth1HttpClient(oauthConfig);
			this.oauth1Client.setState(mapState(xeroConfig)); // only affects private and partner apps
		}

	}
}
