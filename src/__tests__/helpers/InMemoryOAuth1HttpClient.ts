import { IOAuth1HttpClient, IOAuth1State, IToken } from '../../internals/OAuth1HttpClient';
import * as fs from 'fs';

export class InMemoryOAuth1HttpClient implements IOAuth1HttpClient {
	private _readStream: fs.ReadStream = null;
	public lastCalledMethod: string;

	get<T>(endpoint: string, acceptType?: string): Promise<T> {
		throw new Error('Method not implemented.');
	}
	writeResponseToStream = async (endpoint: string, acceptType: string, writeStream: fs.WriteStream): Promise<void> => {
		return new Promise<void>((resolve, reject) => {
			this.lastCalledMethod = 'writeResponseToStream';
			this._readStream.pipe(writeStream);

			this._readStream.on('end', () => {
				resolve();
			});
		});

	}
	lastCalledMethodWas(methodName: string) {
		expect(this.lastCalledMethod).toBe(methodName);
	}
	setWriteResponseToStreamResult = (readStram: fs.ReadStream) => {
		this._readStream = readStram;
	}

	delete<T>(endpoint: string): Promise<T> {
		throw new Error('Method not implemented.');
	}
	put<T>(endpoint: string, body: object): Promise<T> {
		throw new Error('Method not implemented.');
	}
	post<T>(endpoint: string, body: object): Promise<T> {
		throw new Error('Method not implemented.');
	}
	state: IOAuth1State;
	setState(state: Partial<IOAuth1State>): void {
		throw new Error('Method not implemented.');
	}
	getUnauthorisedRequestToken(): Promise<IToken> {
		throw new Error('Method not implemented.');
	}
	buildAuthoriseUrl(unauthorisedRequestToken: string): string {
		throw new Error('Method not implemented.');
	}
	swapRequestTokenforAccessToken(authedRT: IToken, oauth_verifier: string): Promise<IToken> {
		throw new Error('Method not implemented.');
	}
}
