import { XeroError } from '../XeroError';
import { isError } from 'util';

interface IFixture {
	expectedMessage: string;
	statusCode: number;
	data: string;
	headers?: any;
}

// tests based on https://gist.github.com/justmoon/15511f92e5216fa2624b
describe('XeroError', () => {
	const fixtures: IFixture[] = [
		{
			expectedMessage: 'XeroError: token_rejected (Fix the problem)',
			statusCode: 502,
			data: 'oauth_problem=token_rejected&oauth_problem_advice=Fix%20the%20problem'
		},
		{
			expectedMessage: 'XeroError: statusCode=404 data=It went bad!',
			statusCode: 404,
			data: 'It went bad!'
		},
		{
			expectedMessage: 'XeroError: statusCode=404 data=It went bad!',
			statusCode: 404,
			data: 'It went bad!',
			headers: null
		},
		{
			expectedMessage: 'XeroError: Minute rate limit exceeded (please wait before retrying the xero api)',
			statusCode: 503,
			data: 'oauth_problem=rate%20limit%20exceeded&oauth_problem_advice=please%20wait%20before%20retrying%20the%20xero%20api',
			headers: { 'x-rate-limit-problem': 'Minute' }
		}
	];
	fixtures.map((fixture: IFixture) => {
		describe(fixture.expectedMessage, () => {
			let error: XeroError;

			beforeAll(() => {
				error = new XeroError(fixture.statusCode, fixture.data, fixture.headers);
			});

			it(`instanceof XeroError`, () => {
				expect(error instanceof XeroError).toBe(true);
			});

			it('instanceof Error', () => {
				expect(error instanceof Error).toBe(true);
			});

			it('isError()', () => {
				expect(isError(error)).toBe(true);
			});

			it('message is as expected', () => {
				expect(error.message).toEqual(fixture.expectedMessage);
			});

			it('stack is defined', () => {
				expect(error.stack).toBeDefined();
			});

			it('stack starts with message', () => {
				expect(error.stack.split('\n')[0]).toEqual('Error: ' + fixture.expectedMessage);
			});

			it('stack records thrown location', () => {
				expect(error.stack.split('\n')[2]).toContain('XeroError.tests.');
			});

			it('statusCode is set', () => {
				expect(error.statusCode).toEqual(fixture.statusCode);
			});

			it('data is set', () => {
				expect(error.data).toEqual(fixture.data);
			});

			it('headers is set', () => {
				expect(error.headers).toEqual(fixture.headers);
			});
		});
	});
});
