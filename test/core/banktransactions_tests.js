'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;
const util = common.util;
const uuid = common.uuid;

const currentApp = common.currentApp;

describe('bank transactions', () => {
  let sharedTransaction;
  let expenseAccountId;
  let expenseAccountCode;
  let bankAccountId;

  before('create an expense account for testing', () => {
    const randomString = uuid.v4();

    const testAccountData = {
      Code: randomString.replace(/-/g, '').substring(0, 10),
      Name: `Test expense from Node SDK ${randomString}`,
      Type: 'EXPENSE',
      Status: 'ACTIVE',
    };

    const account = currentApp.core.accounts.newAccount(testAccountData);

    return account.save().then(response => {
      expenseAccountId = response.entities[0].AccountID;
      expenseAccountCode = response.entities[0].Code;
    });
  });

  before('create a bank account for testing', () => {
    const randomString = uuid.v4();

    const testAccountData = {
      Code: randomString.replace(/-/g, '').substring(0, 10),
      Name: `Test bank from Node SDK ${randomString}`,
      Type: 'BANK',
      Status: 'ACTIVE',
      BankAccountNumber: '062-021-0000000',
    };

    const account = currentApp.core.accounts.newAccount(testAccountData);

    return account.save().then(response => {
      bankAccountId = response.entities[0].AccountID;
    });
  });

  after('archive the expense account for testing', () => {
    currentApp.core.accounts.getAccount(expenseAccountId).then(response => {
      const account = response;
      account.Status = 'ARCHIVED';
      return account.save();
    });
  });

  it('creates a new transaction', done => {
    const transaction = currentApp.core.bankTransactions.newBankTransaction({
      Type: 'SPEND',
      Contact: {
        Name: 'Johnny McGibbons',
      },
      LineItems: [
        {
          Description: 'Annual Bank Account Fee',
          UnitAmount: 250,
          AccountCode: expenseAccountCode,
        },
      ],
      BankAccount: {
        AccountID: bankAccountId,
      },
    });

    transaction
      .save()
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        expect(response.entities[0].BankTransactionID).to.not.equal('');
        expect(response.entities[0].BankTransactionID).to.not.equal(undefined);
        sharedTransaction = response.entities[0].BankTransactionID;
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get (no paging)', done => {
    currentApp.core.bankTransactions
      .getBankTransactions()
      .then(bankTransactions => {
        expect(bankTransactions).to.have.length.greaterThan(0);
        bankTransactions.forEach(bankTransaction => {
          expect(bankTransaction.BankTransactionID).to.not.equal('');
          expect(bankTransaction.BankTransactionID).to.not.equal(undefined);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get by id', done => {
    currentApp.core.bankTransactions
      .getBankTransaction(sharedTransaction)
      .then(bankTransaction => {
        expect(bankTransaction.BankTransactionID).to.not.equal('');
        expect(bankTransaction.BankTransactionID).to.not.equal(undefined);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
