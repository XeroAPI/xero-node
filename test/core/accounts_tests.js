'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const util = common.util;
const uuid = common.uuid;

const currentApp = common.currentApp;

describe('accounts', () => {
  // Accounts supporting data
  const accountClasses = ['ASSET', 'EQUITY', 'EXPENSE', 'LIABILITY', 'REVENUE'];
  const accountTypes = [
    'BANK',
    'CURRENT',
    'CURRLIAB',
    'DEPRECIATN',
    'DIRECTCOSTS',
    'EQUITY',
    'EXPENSE',
    'FIXED',
    'INVENTORY',
    'LIABILITY',
    'NONCURRENT',
    'OTHERINCOME',
    'OVERHEADS',
    'PREPAYMENT',
    'REVENUE',
    'SALES',
    'TERMLIAB',
    'PAYGLIABILITY',
    'SUPERANNUATIONEXPENSE',
    'SUPERANNUATIONLIABILITY',
    'WAGESEXPENSE',
    'WAGESPAYABLELIABILITY',
  ];
  const accountStatusCodes = ['ACTIVE', 'ARCHIVED'];
  const bankAccountTypes = ['BANK', 'CREDITCARD', 'PAYPAL'];

  it('GET ALL', done => {
    currentApp.core.accounts
      .getAccounts()
      .then(accounts => {
        accounts.forEach(account => {
          // Fields required for POST / PUT
          if (account.Code) {
            expect(account.Code).to.be.a('string');
            expect(account.Code).to.have.length.below(11);
          }

          expect(account.Name).to.not.equal('');
          expect(account.Name).to.be.a('string');

          expect(account.Type).to.not.equal('');
          expect(account.Type).to.be.oneOf(accountTypes);

          if (account.Type === 'BANK') {
            expect(account.BankAccountType).to.be.a('string');
            expect(account.BankAccountType).to.be.oneOf(bankAccountTypes);

            expect(account.BankAccountNumber).to.be.a('string');
            expect(account.BankAccountNumber).to.not.equal('');

            if (account.CurrencyCode) {
              expect(account.CurrencyCode).to.be.a('string');
              expect(account.CurrencyCode).to.not.equal('');
            }
          }

          expect(account.Status).to.be.a('string');
          expect(account.Status).to.be.oneOf(accountStatusCodes);

          // Description is an optional field, when not provided it should be undefined.
          if (account.Description) {
            expect(account.Description).to.be.a('string');
            expect(account.Description).to.have.length.below(4001);
          }

          expect(account.TaxType).to.be.a('string');
          expect(account.TaxType).to.not.equal('');

          expect(account.EnablePaymentsToAccount).to.be.a('boolean');
          expect(account.EnablePaymentsToAccount).to.not.equal(undefined);

          expect(account.ShowInExpenseClaims).to.be.a('boolean');
          expect(account.ShowInExpenseClaims).to.not.equal(undefined);

          // Fields returned in the GET
          expect(account.AccountID).to.not.equal('');
          expect(account.Class).to.be.oneOf(accountClasses);

          if (account.SystemAccount) {
            expect(account.SystemAccount).to.not.equal('');
            expect(account.SystemAccount).to.be.a('string');
          }

          if (account.ReportingCode) {
            expect(account.ReportingCode).to.not.equal('');
            expect(account.ReportingCode).to.be.a('string');
          }

          if (account.ReportingCodeName) {
            expect(account.ReportingCodeName).to.not.equal('');
            expect(account.ReportingCodeName).to.be.a('string');
          }

          expect(account.HasAttachments).to.be.a('boolean');
          expect(account.HasAttachments).to.not.be.equal(undefined);

          expect(account.UpdatedDateUTC).to.not.equal('');
          expect(account.UpdatedDateUTC).to.be.a('Date');
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  // Create a new account
  // Get it, Update it, then delete it

  const randomString = uuid.v4();

  let testAccountId = '';
  const testAccountData = {
    Code: randomString.replace(/-/g, '').substring(0, 10),
    Name: `Test account from Node SDK ${randomString}`,
    Type: 'EXPENSE',
  };

  it('CREATE ONE', done => {
    const account = currentApp.core.accounts.newAccount(testAccountData);

    account
      .save()
      .then(response => {
        const thisAccount = response.entities[0];
        expect(thisAccount.Code).to.equal(testAccountData.Code);
        expect(thisAccount.Name).to.equal(testAccountData.Name);
        expect(thisAccount.Type).to.equal(testAccountData.Type);
        expect(thisAccount.BankAccountNumber).to.equal(
          testAccountData.BankAccountNumber
        );
        // expect(thisAccount.Status).to.equal(testAccountData.Status)
        // expect(thisAccount.Description).to.equal(testAccountData.Description)
        expect(thisAccount.BankAccountType).to.equal(
          testAccountData.BankAccountType
        );
        // expect(thisAccount.CurrencyCode).to.equal(testAccountData.CurrencyCode)
        // expect(thisAccount.TaxType).to.equal(testAccountData.TaxType)
        // expect(thisAccount.EnablePaymentsToAccount).to.equal(testAccountData.EnablePaymentsToAccount)
        // expect(thisAccount.ShowInExpenseClaims).to.equal(testAccountData.ShowInExpenseClaims)

        expect(thisAccount.AccountID).to.not.equal('');
        testAccountId = thisAccount.AccountID;

        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('BANK ACCOUNT FIELDS SERIALIZED', () => {
    const testBankAccountData = {
      Code: "SOMECODE",
      Name: "Test account from Node SDK",
      Type: "BANK",
      CurrencyCode: "CAD",
      BankAccountNumber: "123452",
    };

    const account = currentApp.core.accounts.newAccount(testBankAccountData);

    // make sure things are serialized
    expect(JSON.parse(JSON.stringify(account))).to.deep.equal({
      Code: "SOMECODE",
      Name: "Test account from Node SDK",
      Type: "BANK",
      CurrencyCode: "CAD",
      BankAccountNumber: "123452",
    });
  });

  it('GET ONE', done => {
    currentApp.core.accounts
      .getAccount(testAccountId)
      .then(account => {
        expect(account.Code).to.equal(testAccountData.Code);
        expect(account.Name).to.equal(testAccountData.Name);
        expect(account.Type).to.equal(testAccountData.Type);
        expect(account.BankAccountNumber).to.equal(
          testAccountData.BankAccountNumber
        );
        // expect(account.Status).to.equal(testAccountData.Status)
        // expect(account.Description).to.equal(testAccountData.Description)
        // expect(account.BankAccountType).to.equal(testAccountData.BankAccountType)
        // expect(account.CurrencyCode).to.equal(testAccountData.CurrencyCode)
        // expect(account.TaxType).to.equal(testAccountData.TaxType)
        // expect(account.EnablePaymentsToAccount).to.equal(testAccountData.EnablePaymentsToAccount)
        // expect(account.ShowInExpenseClaims).to.equal(testAccountData.ShowInExpenseClaims)

        expect(account.AccountID).to.not.equal('');
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('UPDATE ONE', done => {
    currentApp.core.accounts
      .getAccount(testAccountId)
      .then(response => {
        const account = response;
        testAccountData.Name = `Updated from the SDK ${uuid.v4()}`;
        account.Name = testAccountData.Name;

        return account.save();
      })
      .then(response => {
        const thisAccount = response.entities[0];
        expect(thisAccount.Name).to.equal(testAccountData.Name);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('DELETE ONE', done => {
    currentApp.core.accounts
      .deleteAccount(testAccountId)
      .then(response => {
        expect(response.Status).to.equal('OK');
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get attachments for accounts', done => {
    const filter = 'HasAttachments == true';
    currentApp.core.accounts
      .getAccounts({ where: filter })
      .then(accounts => {
        if (accounts.length === 0) done();
        let objectsProcessed = 0;
        accounts.forEach(account => {
          account
            .getAttachments()
            .then(attachments => {
              objectsProcessed += 1;
              attachments.forEach((attachment, index) => {
                expect(attachment.AttachmentID).to.not.equal('');
                expect(attachment.AttachmentID).to.not.equal(undefined);

                if (
                  objectsProcessed === accounts.length &&
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
});
