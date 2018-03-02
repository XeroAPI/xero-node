import { getStringFromFile } from '../utils';
import * as path from 'path';

export function isUUID(s: string) {
	return s.match(`^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`);
}

export const validTestCertPath = () => path.resolve(__dirname, 'test-privatekey.pem');

export function testCertString() {
	return getStringFromFile(validTestCertPath());
}
