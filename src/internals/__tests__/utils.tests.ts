import { getStringFromFile, generateQueryString } from '../utils';
import { validTestCertPath } from './helpers/privateKey-helpers';

describe('getStringFromFile()', () => {
	it('returns string from file', () => {
		const result = getStringFromFile(validTestCertPath());
		expect(result).toContain('-----BEGIN RSA PRIVATE KEY-----');
		expect(result).toContain('-----END RSA PRIVATE KEY-----');
		expect(result).toContain('VrppKCesvPJmo/4y77Dsxt5ukPEAO3nWrwJAWTzBH0ZeYlGxe8KpTEKW6ZifQb1P');
	});

	it('throws when key not there', () => {
		expect.assertions(2);
		try {
			getStringFromFile('./something/test-privatekey.pem');
		} catch (error) {
			expect(error.message).toContain('ENOENT: no such file or directory, open');
			expect(error.message).toContain('test-privatekey.pem');
		}
	});
});

describe('generateQueryString()', () => {
	it(`empty object becomes ''`, () => {
		expect(generateQueryString({})).toEqual('');
	});
	it(`undefined becomes ''`, () => {
		expect(generateQueryString(undefined)).toEqual('');
	});
	it(`null becomes ''`, () => {
		expect(generateQueryString(null)).toEqual('');
	});
	it('handles single param', () => {
		expect(generateQueryString({ where: 'Type=="ACCREC"' })).toEqual('?where=Type%3D%3D%22ACCREC%22');
	});
	it('handles multiple params', () => {
		expect(generateQueryString({ page: 5, where: 'Type=="ACCREC"' })).toEqual('?page=5&where=Type%3D%3D%22ACCREC%22');
	});
	it('maintains declaration order for multiple params', () => {
		expect(generateQueryString({ where: 'Type=="ACCREC"', page: 5 })).toEqual('?where=Type%3D%3D%22ACCREC%22&page=5');
	});
});
