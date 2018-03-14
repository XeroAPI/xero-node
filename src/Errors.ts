export class XeroAuthError extends Error {
	constructor(message: string) {
		super('XeroAuthError: ' + message);
		// https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
		(this as any).__proto__ = new.target.prototype;
	}
}

export class XeroHttpError extends Error {
	constructor(public readonly statusCode: number, public readonly body: any) {
		super(`XeroHttpError: statusCode='${statusCode}`);
		// https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
		(this as any).__proto__ = new.target.prototype;
	}
}
