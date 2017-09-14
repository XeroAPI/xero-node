'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const createAccount = functions.createAccount;
const util = common.util;

const currentApp = common.currentApp;

const validateBankTransaction = bankTransaction => {
  if (!bankTransaction) return false;

  expect(bankTransaction.BankTransactionID).to.not.equal('');
  expect(bankTransaction.BankTransactionID).to.not.equal(undefined);

  bankTransaction.LineItems.forEach(lineItem => {
    expect(lineItem.LineItemID).to.be.a('String');
    expect(lineItem.UnitAmount).to.match(/[0-9]+\.?[0-9]{0,4}/);
    expect(lineItem.UnitAmount).to.be.a('Number');

    if (lineItem.TaxType) {
      expect(lineItem.TaxType).to.be.a('String');
    }

    expect(lineItem.TaxAmount).to.be.a('Number');
    expect(lineItem.LineAmount).to.be.a('Number');

    if (lineItem.AccountCode) {
      expect(lineItem.AccountCode).to.be.a('String');
    }

    expect(lineItem.Quantity).to.be.a('Number');

    lineItem.Tracking.forEach(trackingCategory => {
      expect(trackingCategory.TrackingCategoryID).to.be.a('String');
      expect(trackingCategory.Name).to.be.a('String');
      expect(trackingCategory.Option).to.be.a('String');
    });
  });

  return true;
};

describe('bank transactions', () => {
  let sharedTransaction;
  let expenseAccountId;
  let expenseAccountCode;
  let bankAccountId;

  before('create an expense account for testing', () =>
    createAccount({ Type: 'EXPENSE' }).then(response => {
      expenseAccountId = response.entities[0].AccountID;
      expenseAccountCode = response.entities[0].Code;
    })
  );

  before('create a bank account for testing', () =>
    createAccount({
      Type: 'BANK',
      BankAccountNumber: '062-021-0000000',
    }).then(response => {
      bankAccountId = response.entities[0].AccountID;
    })
  );

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
          Tracking: [
            {
              Name: 'Region',
              Option: 'South',
            },
          ],
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
        expect(validateBankTransaction(response.entities[0])).to.equal(true);
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
          expect(validateBankTransaction(bankTransaction)).to.equal(true);
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
        expect(validateBankTransaction(bankTransaction)).to.equal(true);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('create multiple banktransactions', done => {
    const banktransactions = [];

    for (let i = 0; i < 2; i += 1) {
      banktransactions.push(
        currentApp.core.bankTransactions.newBankTransaction({
          Type: 'SPEND',
          Contact: {
            Name: 'Johnny McGibbons',
          },
          LineItems: [
            {
              Description: 'Annual Bank Account Fee',
              UnitAmount: 0.01,
              AccountCode: expenseAccountCode,
            },
          ],
          BankAccount: {
            AccountID: bankAccountId,
          },
        })
      );
    }

    currentApp.core.bankTransactions
      .saveBankTransactions(banktransactions)
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        response.entities.forEach(bankTransaction => {
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

  it('get attachments for bankTransactions', done => {
    const filter = 'HasAttachments == true';
    currentApp.core.bankTransactions
      .getBankTransactions({ where: filter })
      .then(bankTransactions => {
        if (bankTransactions.length === 0) done();
        let objectsProcessed = 0;
        bankTransactions.forEach(transaction => {
          transaction
            .getAttachments()
            .then(attachments => {
              objectsProcessed += 1;
              attachments.forEach((attachment, index) => {
                expect(attachment.AttachmentID).to.not.equal('');
                expect(attachment.AttachmentID).to.not.equal(undefined);

                if (
                  objectsProcessed === bankTransactions.length &&
                  index === attachments.length - 1
                ) {
                  done();
                }
              });
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
            });
        });
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('create multiple banktransactions', done => {
    const banktransactions = [];

    for (let i = 0; i < 5; i += 1) {
      banktransactions.push(
        currentApp.core.bankTransactions.newBankTransaction({
          Type: 'SPEND',
          Contact: {
            Name: 'Johnny McGibbons',
          },
          LineItems: [
            {
              Description: 'Annual Bank Account Fee',
              UnitAmount: Math.random() * 100,
              AccountCode: expenseAccountCode,
            },
          ],
          BankAccount: {
            AccountID: bankAccountId,
          },
        })
      );
    }

    currentApp.core.bankTransactions
      .saveBankTransactions(banktransactions)
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        response.entities.forEach(bankTransaction => {
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
});
