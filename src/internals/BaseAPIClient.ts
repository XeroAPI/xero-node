import { IOAuth1HttpClient, OAuth1HttpClient, OAuth1Configuration, AccessToken } from './OAuth1HttpClient';
import { mapConfig, mapState } from './config-helper';
import * as  fs from 'fs';
import { AttachmentsResponse } from '../AccountingAPI-responses';

/**
 * TODO: Add support for the following keys:
 *
 * - PrivateKeyPassword
 */
export interface XeroClientConfiguration {
	appType: 'public' | 'private' | 'partner';
	consumerKey: string;
	consumerSecret: string;
	privateKeyPath?: string;
	privateKeyString?: string;
	callbackUrl?: string;
	userAgent?: string;
}

/**
 * @private
 * Options specific to the API in use
 */
export interface ApiConfiguration {
	tenantType?: string;
	apiBasePath?: string;
}

/** @private */
export interface IHttpClient {
	get<T>(endpoint: string, headers?: { [key: string]: string }): Promise<T>;
	delete<T>(endpoint: string, headers?: { [key: string]: string }): Promise<T>;
	put<T>(endpoint: string, body: object, headers?: { [key: string]: string }): Promise<T>;
	patch<T>(endpoint: string, body: object, headers?: { [key: string]: string }): Promise<T>;
	post<T>(endpoint: string, body: object, headers?: { [key: string]: string }): Promise<T>;
	writeUTF8ResponseToStream(endpoint: string, mimeType: string, writeStream: fs.WriteStream): Promise<void>;
	writeBinaryResponseToStream(endpoint: string, mimeType: string, writeStream: fs.WriteStream): Promise<void>;
	readStreamToRequest(endpoint: string, mimeType: string, size: number, readStream: fs.ReadStream): Promise<AttachmentsResponse>;
}

/** @private */
export class BaseAPIClient {

	public constructor(xeroConfig: XeroClientConfiguration, authState: AccessToken = null, apiConfig: ApiConfiguration = {}, public readonly oauth1Client: IOAuth1HttpClient = null) {
		if (!xeroConfig) {
			throw new Error('Config must be passed in when creating a new instance');
		}

		if (!this.oauth1Client) {
			const oauthConfig: OAuth1Configuration = mapConfig(xeroConfig, apiConfig);
			if (!authState) {
				authState = mapState(xeroConfig);
			}
			this.oauth1Client = new OAuth1HttpClient(oauthConfig, authState);
		}

	}
}
