import { XeroError } from '../XeroError';
import { isError } from 'util';

interface IFixture {
	type: any;
	expectedMessage: string;
	throwFn: () => never;
}

// tests based on https://gist.github.com/justmoon/15511f92e5216fa2624b
describe('XeroError', () => {
	const fixtures: IFixture[] = [
		{ type: XeroError, expectedMessage: 'XeroError: token_rejected (Fix the problem)', throwFn: () => { throw new XeroError(502, 'oauth_problem=token_rejected&oauth_problem_advice=Fix%20the%20problem'); } },
		{ type: XeroError, expectedMessage: 'XeroError: statusCode=404 (It went bad!)', throwFn: () => { throw new XeroError(404, 'It went bad!'); } }
	];
	fixtures.map((fixture: IFixture) => {
		describe(fixture.type.name, () => {
			let error: XeroError;

			beforeAll(() => {
				try {
					fixture.throwFn();
				} catch (err) {
					error = err;
				}
			});

			it(`instanceof ${fixture.type.name}`, () => {
				expect(error instanceof fixture.type).toBe(true);
			});

			it('instanceof Error', () => {
				expect(error instanceof Error).toBe(true);
			});

			it('isError()', () => {
				expect(isError(error)).toBe(true);
			});

			it('message is set', () => {
				expect(error.message).toEqual(fixture.expectedMessage);
			});

			it('stack is defined', () => {
				expect(error.stack).toBeDefined();
			});

			it('stack starts with message', () => {
				expect(error.stack.split('\n')[0]).toEqual('Error: ' + fixture.expectedMessage);
			});

			it('stack records thrown location', () => {
				expect(error.stack.split('\n')[2]).toContain('throwFn');
			});
		});
	});
});
