import { getStringFromFile } from '../utils';

export function isUUID(s: string) {
	return s.match(`^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`);
}

export const validTestCertPath = './src/__tests__/unit/test-privatekey.pem';

export function testCertString(){
	return getStringFromFile(validTestCertPath);
}
