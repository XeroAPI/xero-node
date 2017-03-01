
import { XeroAPIClient } from '../client';
import * as path from 'path';
import * as fs from 'fs';

const privateKeyFile = path.resolve(__dirname, '..', '..', '..', 'xeroapp.key');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

const xero = new XeroAPIClient({
	appType: 'private',
	consumerKey: 'PFWJ8Y9WV0FGG5C8ELVQOYQRMA2NRP',
	consumerSecret: 'NKNC0FL3ILNLA9WXXZHNAA68SWOVY0',
	privateKey: privateKey
});

xero.get('Users');
