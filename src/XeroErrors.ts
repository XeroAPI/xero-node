import * as querystring from 'querystring';

export class XeroAuthError extends Error {
	public readonly statusCode: number;
	public readonly data: any;
	constructor(statusCode: number, data: string) {
		const queryobj = querystring.parse(data);
		if (queryobj.oauth_problem && queryobj.oauth_problem_advice) {
			super(`XeroAuthError: ${queryobj.oauth_problem} (${queryobj.oauth_problem_advice})`);
		} else {
			super(`XeroAuthError: statusCode=${statusCode}`);
		}

		// https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
		(this as any).__proto__ = new.target.prototype;

		this.statusCode = statusCode;
		this.data = data;
	}
}

export class XeroHttpError extends Error {
	constructor(public readonly statusCode: number, public readonly data: any) {
		super(`XeroHttpError: statusCode=${statusCode}`);

		// https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
		(this as any).__proto__ = new.target.prototype;
	}
}
