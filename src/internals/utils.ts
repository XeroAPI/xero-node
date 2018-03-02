/** @internalapi */
/** This second comment is required for typedoc to recognise the WHOLE FILE as @internalapi */

import * as path from 'path';
import * as fs from 'fs';

export function getStringFromFile(location: string){
	const privateKeyFile = path.resolve(location);
	const privateKey = fs.readFileSync(privateKeyFile, 'utf8');
	return privateKey;
}
