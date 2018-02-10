import { IOAuthClientConfiguration, IOAuthClient } from '../OAuthClient';

export class InMemoryOAuthClient implements IOAuthClient {

	private returnsWith = {};

	public async get<T>(endpoint: string, args?: any): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			resolve(this.returnsWith as T);
		});
	}

	public returnsWithNextGet(returnThis){
		this.returnsWith = returnThis;
	}
}
