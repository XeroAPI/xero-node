let fs = require('fs');
const testFolder = './src/__integration_tests__/';
// I have base64 encoded the ley on CCI as multi line env vars are not well supported in CCI.
fs.writeFileSync(testFolder + 'helpers/privatekey.pem', Buffer.from(process.env.PRIVATE_KEY, 'base64'));
