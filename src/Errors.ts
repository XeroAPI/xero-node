export class XeroAuthError extends Error {
	constructor(message: string) {
		super('XeroAuthError: ' + message);
		// https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
		(this as any).__proto__ = new.target.prototype;
	}
}

export class XeroHttpError extends Error {
	constructor(message: string) {
		super('XeroHttpError: ' + message);
		// https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
		(this as any).__proto__ = new.target.prototype;
	}
}
