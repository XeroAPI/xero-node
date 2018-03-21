import * as querystring from 'querystring';

export class XeroError extends Error {
	public readonly statusCode: number;
	public readonly data: any;
	public readonly headers: any;

	constructor(statusCode: number, data: string, headers: any) {
		let message: string = 'XeroError:';
		const queryobj = querystring.parse(data);
		if (queryobj.oauth_problem && queryobj.oauth_problem_advice) {
			if (statusCode == 503 && headers) {
				message += ' ' + (headers['x-rate-limit-problem'] || headers['X-Rate-Limit-Problem'] || '');
			}
			message += ` ${queryobj.oauth_problem} (${queryobj.oauth_problem_advice})`;
		} else {
			message += ` statusCode=${statusCode} data=${data}`;
		}
		super(message);

		// https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
		(this as any).__proto__ = new.target.prototype;

		this.statusCode = statusCode;
		this.data = data;
		this.headers = headers;
	}
}
