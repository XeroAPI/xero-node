'use strict';

const common = require('./common');

const uuid = common.uuid;
const currentApp = common.currentApp;

const wrapError = err => {
  if (err instanceof Error) return err;
  else if (err.statusCode) {
    let msg = err.data;
    if (err.exception && err.exception.Message) {
      msg = err.exception.Message;
    }
    return new Error(`${err.statusCode}: ${msg}`);
  }
  return new Error(`Error occurred: ${err}`);
};

const createAccount = accountDetails => {
  const randomString = uuid.v4();

  return currentApp.core.organisations
    .getOrganisation()
    .then(ret => ret.Version)
    .then(version => {
      const testAccountData = {
        Code: randomString.replace(/-/g, '').substring(0, 10),
        Name: `Test sales from Node SDK ${randomString}`,
        Status: 'ACTIVE',
      };

      // Pull in parameters passed in to the function
      Object.assign(testAccountData, accountDetails);

      if (version === 'NZ' && testAccountData.Type !== 'EXPENSE') {
        testAccountData.taxType = 'OUTPUT2';
      } else {
        testAccountData.taxType = 'OUTPUT';
      }

      const account = currentApp.core.accounts.newAccount(testAccountData);

      return account.save();
    });
};

module.exports.createAccount = createAccount;
module.exports.wrapError = wrapError;
