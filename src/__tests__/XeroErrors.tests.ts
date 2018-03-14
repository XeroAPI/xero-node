import { XeroAuthError } from '../XeroErrors';
import { isError } from 'util';

function doSomethingBad() {
	throw new XeroAuthError('It went bad!');
}

// tests based on https://gist.github.com/justmoon/15511f92e5216fa2624b
describe('XeroAuthError', () => {
	let error: XeroAuthError;

	beforeAll(() => {
		try {
			doSomethingBad();
		} catch (err) {
			error = err;
		}
	});

	it('instanceof XeroAuthError', () => {
		expect(error instanceof XeroAuthError).toBe(true);
	});

	it('instanceof Error', () => {
		expect(error instanceof Error).toBe(true);
	});

	it('isError()', () => {
		expect(isError(error)).toBe(true);
	});

	it('message is set', () => {
		expect(error.message).toEqual('XeroAuthError: It went bad!');
	});

	it('stack is defined', () => {
		expect(error.stack).toBeDefined();
	});

	it('stack starts with message', () => {
		expect(error.stack.split('\n')[0]).toEqual('Error: XeroAuthError: It went bad!');
	});

	it('stack records thrown location', () => {
		expect(error.stack.split('\n')[2]).toContain('doSomethingBad');
	});
});
