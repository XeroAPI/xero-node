import { IOAuthClient } from '../../OAuthClient';

export class InMemoryOAuthClient implements IOAuthClient {

	private returnGetWith = {};
	private returnPutWith = {};
	private lastCalledURL = '';

	public async get<T>(endpoint: string, args?: any): Promise<T> {
		this.lastCalledURL = endpoint;
		return new Promise<T>((resolve, reject) => {
			resolve(this.returnGetWith as T);
		});
	}

	public async put<T>(endpoint: string, args?: any): Promise<T> {
		this.lastCalledURL = endpoint;
		return new Promise<T>((resolve, reject) => {
			resolve(this.returnGetWith as T);
		});
	}

	public async delete<T>(endpoint: string, args?: any): Promise<T> {
		throw new Error('Method not implemented.');
	}

	public returnsWithNextGet(returnThis: any){
		this.returnGetWith = returnThis;
	}

	public returnsWithNextPut(returnThis: any){
		this.returnPutWith = returnThis;
	}

	public calledThisURL(url: string){
		expect(this.lastCalledURL).toBe(url);
	}
}
