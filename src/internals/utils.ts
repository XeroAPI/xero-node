import * as path from 'path';
import * as fs from 'fs';

/** @internalapi */
export function getStringFromFile(location: string){
	const privateKeyFile = path.resolve(location);
	const privateKey = fs.readFileSync(privateKeyFile, 'utf8');
	return privateKey;
}
