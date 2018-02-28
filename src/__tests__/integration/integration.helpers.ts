import * as path from 'path';

export function getConfig(){
	const data = require('./xero.json');
	const config = { ...data, ...{ PrivateKeyCert: path.resolve(__dirname, '..', '..', '..', 'privatekey.pem') } };
	return config;
}
