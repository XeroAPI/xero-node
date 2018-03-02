import * as path from 'path';
import { getStringFromFile } from '../../utils';

export const validTestCertPath = () => path.resolve(__dirname, 'test-privatekey.pem');

export function testCertString() {
	return getStringFromFile(validTestCertPath());
}
