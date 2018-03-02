import { getStringFromFile } from '../../utils';
import { validTestCertPath } from '../test-helpers';

describe('getStringFromFile', () => {
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
