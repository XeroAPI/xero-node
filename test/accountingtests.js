'use strict';

const chai = require('chai');
const sinon = require('sinon');
const Browser = require('zombie');
const xero = require('..');
const util = require('util');
const uuid = require('uuid');
const fs = require('fs');

const expect = chai.expect;

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

process.on('uncaughtException', err => {
  console.error('uncaught', err);
});

// Change the log level
xero.setLogLevel('debug');

let currentApp;
let eventReceiver;
let organisationCountry = '';
let expenseAccount = '';
let revenueAccount = '';
let salesAccount = '';

let someContactId = '';

let metaConfig = {};

try {
  const configFile = fs.readFileSync('test/config/testing_config.json');
  metaConfig = JSON.parse(configFile);
} catch (ex) {
  if (process && process.env && process.env.APPTYPE) {
    // no config file found, so check the process.env.
    metaConfig.APPTYPE = process.env.APPTYPE;
    metaConfig[metaConfig.APPTYPE.toLowerCase()] = {
      authorizeCallbackUrl: process.env.authorizeCallbackUrl,
      userAgent: process.env.userAgent,
      consumerKey: process.env.consumerKey,
      consumerSecret: process.env.consumerSecret,
      privateKeyPath: process.env.privateKeyPath,
      privateKey: process.env.privateKey,
    };
  } else {
    throw new Error(ex);
  }
}

const APPTYPE = metaConfig.APPTYPE;
const config = metaConfig[APPTYPE.toLowerCase()];

if (config.privateKeyPath && !config.privateKey)
  config.privateKey = fs.readFileSync(config.privateKeyPath);

before('init instance and set options', done => {
  switch (APPTYPE) {
    case 'PRIVATE':
      currentApp = new xero.PrivateApplication(config);
      break;
    case 'PUBLIC':
      currentApp = new xero.PublicApplication(config);
      break;
    case 'PARTNER':
      currentApp = new xero.PartnerApplication(config);
      break;
    default:
      throw new Error('No App Type Set!!');
  }

  eventReceiver = currentApp.eventEmitter;

  done();
});

describe('get access for public or partner application', () => {
  beforeEach(function() {
    if (APPTYPE === 'PRIVATE') {
      this.skip();
    }
  });

  describe('Get tokens', () => {
    let authoriseUrl = '';
    let requestToken = '';
    let requestSecret = '';
    let verifier = '';

    // This function is used by the event emitter to receive the event when the token
    // is automatically refreshed.  We use the 'spy' function so that we can include
    // some checks within the tests.
    const spy = sinon.spy((...args) => {
      console.error('Event Received. Creating new Partner App');

      // Create a new application object when we receive new tokens
      currentApp = new xero.PartnerApplication(config);
      currentApp.setOptions(args[0]);
      // Reset the event receiver so the listener stack is shared correctly.
      eventReceiver = currentApp.eventEmitter;
      eventReceiver.on('xeroTokenUpdate', data => {
        console.error(`Event Received: ${data}`);
      });

      console.error('Partner app recreated');
    });

    it('adds the event listener', done => {
      eventReceiver.on('xeroTokenUpdate', spy);
      done();
    });

    it('user gets a token and builds the url', () =>
      currentApp.getRequestToken().then(res => {
        requestToken = res.token;
        requestSecret = res.secret;
        authoriseUrl = currentApp.buildAuthorizeUrl(requestToken);
        console.error(`URL: ${authoriseUrl}`);
        console.error(`token: ${requestToken}`);
        console.error(`secret: ${requestSecret}`);
      }));

    describe('gets the request token from the url', () => {
      const userAgentString =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7';
      const browser = new Browser({
        userAgent: userAgentString,
        waitFor: 20000,
        runScripts: false,
      });

      // browser.debug();

      before(function(done) {
        if (APPTYPE === 'PRIVATE') {
          this.skip();
        }

        browser.visit(authoriseUrl, done);
      });

      describe('submits form', () => {
        const options = {
          XeroUsername: config.xeroUsername,
          XeroPassword: config.xeroPassword,
        };

        it('should login', done =>
          browser
            .fill('userName', options.XeroUsername)
            .fill('password', options.XeroPassword)
            .pressButton('Login', done));

        it('should be successful', done => {
          browser.assert.success();
          done();
        });

        it('should see noscript page', done => {
          browser.assert.text('title', 'Working...');
          browser.document.forms[0].submit();
          browser.wait().then(() =>
            // just dump some debug data to see if we're on the right page
            // console.error(browser.dump());
            done()
          );
        });

        it('should see application auth page', done => {
          // console.error(browser.document.documentElement.innerHTML);
          browser.assert.text('title', 'Xero | Authorise Application');

          if (APPTYPE === 'PUBLIC') {
            browser.pressButton('Allow access for 30 mins');
          } else {
            // It must be a partner app
            browser.pressButton('Allow access');
          }

          browser.wait().then(() =>
            // just dump some debug data to see if we're on the right page
            // console.error(browser.dump());
            done()
          );
        });

        it('should get a code to enter', done => {
          browser.assert.text('title', 'Xero | Authorise Application');
          verifier = browser.field('#pin-input').value;

          expect(verifier).to.not.equal('');
          expect(verifier).to.be.a('String');
          done();
        });
      });
    });

    describe('swaps the request token for an access token', () => {
      it('calls the access token method and sets the options', done => {
        currentApp
          .setAccessToken(requestToken, requestSecret, verifier)
          .then(() => {
            expect(currentApp.options.accessToken).to.not.equal(undefined);
            expect(currentApp.options.accessToken).to.not.equal('');
            expect(currentApp.options.accessSecret).to.not.equal(undefined);
            expect(currentApp.options.accessSecret).to.not.equal('');

            if (APPTYPE === 'PARTNER') {
              expect(currentApp.options.sessionHandle).to.not.equal(undefined);
              expect(currentApp.options.sessionHandle).to.not.equal('');
            }

            done();
          })
          .catch(err => {
            done(wrapError(err));
          });
      });

      it('refreshes the token', done => {
        if (APPTYPE !== 'PARTNER') {
          done();
        } else {
          // Only supported for Partner integrations
          currentApp
            .refreshAccessToken()
            .then(() => {
              expect(currentApp.options.accessToken).to.not.equal(undefined);
              expect(currentApp.options.accessToken).to.not.equal('');
              expect(currentApp.options.accessSecret).to.not.equal(undefined);
              expect(currentApp.options.accessSecret).to.not.equal('');
              expect(currentApp.options.sessionHandle).to.not.equal(undefined);
              expect(currentApp.options.sessionHandle).to.not.equal('');

              expect(spy.called).to.equal(true);
              done();
            })
            .catch(err => {
              done(wrapError(err));
            });
        }
      });
    });
  });
});

describe('regression tests', () => {
  let InvoiceID = '';
  let PaymentID = '';

  const bankAccounts = [];

  before('create a bank account', () => {
    const randomString = uuid.v4();

    const testAccountData = {
      Code: randomString.replace(/-/g, '').substring(0, 10),
      Name: `Test account from Node SDK ${randomString}`,
      Type: 'BANK',
      BankAccountNumber: '062-021-0000000',
    };

    const account = currentApp.core.accounts.newAccount(testAccountData);

    return account.save().then(response => {
      const thisAccount = response.entities[0];
      bankAccounts.push({
        account,
        id: thisAccount.AccountID,
      });
    });
  });

  before('create another bank account', () => {
    const randomString = uuid.v4();

    const testAccountData = {
      Code: randomString.replace(/-/g, '').substring(0, 10),
      Name: `Test account from Node SDK ${randomString}`,
      Type: 'BANK',
      BankAccountNumber: '062-123-0000000',
    };

    const account = currentApp.core.accounts.newAccount(testAccountData);

    return account.save().then(response => {
      const thisAccount = response.entities[0];
      bankAccounts.push({
        account,
        id: thisAccount.AccountID,
      });
    });
  });

  before('create a sales account', () => {
    const randomString = uuid.v4();

    const testAccountData = {
      Code: randomString.replace(/-/g, '').substring(0, 10),
      Name: `Test account from Node SDK ${randomString}`,
      Type: 'SALES',
    };

    const account = currentApp.core.accounts.newAccount(testAccountData);

    return account.save().then(response => {
      expect(response.entities.length).to.be.greaterThan(0);
      const thisAccount = response.entities[0];
      bankAccounts.push({
        account,
        id: thisAccount.AccountID,
      });
    });
  });

  describe('reporting tests', () => {
    const validateRows = rows => {
      const validateCells = row => {
        expect(row.Cells).to.have.length.greaterThan(0);
        row.Cells.forEach(cell => {
          // each cell can either be a string or an object
          expect(cell).to.not.equal(undefined);
          expect(cell).to.satisfy(
            c => typeof c === 'string' || typeof c === 'object'
          );
        });
      };
      expect(rows).to.have.length.greaterThan(0);
      rows.forEach(row => {
        expect(row.RowType).to.be.oneOf([
          'Header',
          'Section',
          'Row',
          'SummaryRow',
        ]);

        // Each row can have some cells, each cell should have some data.
        if (row.Cells) {
          validateCells(row);
        }

        if (row.Rows && row.Rows.length > 0) {
          row.Rows.forEach(thisRow => {
            validateCells(thisRow);
          });
        }
      });
    };

    it('Generates a Balance Sheet Report', done => {
      currentApp.core.reports
        .generateReport({ id: 'BalanceSheet' })
        .then(report => {
          expect(report.ReportType).to.equal('BalanceSheet');
          expect(report.ReportName).to.equal('Balance Sheet');

          validateRows(report.Rows);

          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('Generates a Bank Statement Report', done => {
      currentApp.core.reports
        .generateReport({
          id: 'BankStatement',
          params: {
            bankAccountID: bankAccounts[0].id,
          },
        })
        .then(report => {
          expect(report.ReportType).to.equal('BankStatement');
          expect(report.ReportName).to.equal('Bank Statement');

          validateRows(report.Rows);

          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('Generates a Trial Balance Report', done => {
      currentApp.core.reports
        .generateReport({
          id: 'TrialBalance',
        })
        .then(report => {
          expect(report.ReportType).to.equal('TrialBalance');
          expect(report.ReportName).to.equal('Trial Balance');
          validateRows(report.Rows);
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('Generates a Profit and Loss Report', done => {
      currentApp.core.reports
        .generateReport({
          id: 'ProfitAndLoss',
        })
        .then(report => {
          expect(report.ReportType).to.equal('ProfitAndLoss');
          expect(report.ReportName).to.equal('Profit and Loss');
          validateRows(report.Rows);
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('Generates a Budget Summary Report', done => {
      currentApp.core.reports
        .generateReport({
          id: 'BudgetSummary',
        })
        .then(report => {
          expect(report.ReportType).to.equal('BudgetSummary');
          expect(report.ReportName).to.equal('Budget Summary');
          validateRows(report.Rows);
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('Generates an Executive Summary Report', done => {
      currentApp.core.reports
        .generateReport({
          id: 'ExecutiveSummary',
        })
        .then(report => {
          expect(report.ReportType).to.equal('ExecutiveSummary');
          expect(report.ReportName).to.equal('Executive Summary');
          validateRows(report.Rows);
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('Generates a Bank Summary Report', done => {
      currentApp.core.reports
        .generateReport({
          id: 'BankSummary',
        })
        .then(report => {
          expect(report.ReportType).to.equal('BankSummary');
          expect(report.ReportName).to.equal('Bank Summary');
          validateRows(report.Rows);
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('Generates an Aged Receivables Report', done => {
      currentApp.core.contacts
        .getContacts()
        .then(contacts => {
          someContactId = contacts[0].ContactID;

          currentApp.core.reports
            .generateReport({
              id: 'AgedReceivablesByContact',
              params: {
                contactId: someContactId,
              },
            })
            .then(report => {
              expect(report.ReportType).to.equal('AgedReceivablesByContact');
              expect(report.ReportName).to.equal('Aged Receivables By Contact');
              validateRows(report.Rows);
              done();
            })
            .catch(err => {
              throw err;
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('Generates an Aged Payables Report', done => {
      currentApp.core.contacts
        .getContacts()
        .then(contacts => {
          someContactId = contacts[0].ContactID;

          currentApp.core.reports
            .generateReport({
              id: 'AgedPayablesByContact',
              params: {
                contactId: someContactId,
              },
            })
            .then(report => {
              expect(report.ReportType).to.equal('AgedPayablesByContact');
              expect(report.ReportName).to.equal('Aged Payables By Contact');
              validateRows(report.Rows);
              done();
            })
            .catch(err => {
              throw err;
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
  });

  describe('organisations', () => {
    it('get', done => {
      currentApp.core.organisations
        .getOrganisation()
        .then(ret => {
          const orgVersions = ['AU', 'NZ', 'GLOBAL', 'UK', 'US'];
          expect(ret.Name).to.not.equal('');
          expect(ret.Version).to.not.equal('');
          expect(ret.Version).to.be.oneOf(orgVersions);

          organisationCountry = ret.Version;

          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });
  });

  describe('accounts', () => {
    // Accounts supporting data
    const accountClasses = [
      'ASSET',
      'EQUITY',
      'EXPENSE',
      'LIABILITY',
      'REVENUE',
    ];
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

            if (account.Code && account.Status !== 'ARCHIVED') {
              if (
                account.Type === 'EXPENSE' &&
                !account.SystemAccount &&
                !expenseAccount
              ) {
                // Save this for later use
                expenseAccount = account.Code;
              }

              if (
                account.Type === 'SALES' &&
                !account.SystemAccount &&
                !salesAccount
              ) {
                // Save this for later use
                salesAccount = account.Code;
              }

              if (
                account.Type === 'REVENUE' &&
                !account.SystemAccount &&
                !revenueAccount
              ) {
                // Save this for later use
                revenueAccount = account.Code;
              }
            }

            expect(account.Status).to.be.a('string');
            expect(account.Status).to.be.oneOf(accountStatusCodes);

            // Description is an optional field, when not provided it should be undefined.
            if (account.Description) {
              expect(account.Description).to.be.a('string');
              expect(account.Description).to.have.length.below(4001);
            } else {
              expect(account.Description).to.equal(undefined);
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
            expect(account.HasAttachments).to.not.equal(undefined);

            expect(account.UpdatedDateUTC).to.not.equal('');
            expect(account.UpdatedDateUTC).to.be.a('string');
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
          // expect(thisAccount.Status).to.equal(testAccountData.Status);
          // expect(thisAccount.Description).to.equal(testAccountData.Description);
          expect(thisAccount.BankAccountType).to.equal(
            testAccountData.BankAccountType
          );
          // expect(thisAccount.CurrencyCode).to.equal(testAccountData.CurrencyCode);
          // expect(thisAccount.TaxType).to.equal(testAccountData.TaxType);
          // expect(thisAccount.EnablePaymentsToAccount).to.equal(testAccountData.EnablePaymentsToAccount);
          // expect(thisAccount.ShowInExpenseClaims).to.equal(testAccountData.ShowInExpenseClaims);

          expect(thisAccount.AccountID).to.not.equal('');
          testAccountId = thisAccount.AccountID;

          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
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
          // expect(account.Status).to.equal(testAccountData.Status);
          // expect(account.Description).to.equal(testAccountData.Description);
          expect(account.BankAccountType).to.equal(
            testAccountData.BankAccountType
          );
          // expect(account.CurrencyCode).to.equal(testAccountData.CurrencyCode);
          // expect(account.TaxType).to.equal(testAccountData.TaxType);
          // expect(account.EnablePaymentsToAccount).to.equal(testAccountData.EnablePaymentsToAccount);
          // expect(account.ShowInExpenseClaims).to.equal(testAccountData.ShowInExpenseClaims);

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
          testAccountData.Name = `Updated from the SDK ${uuid.v4()}`;

          const account = response;
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
  });

  describe('Credit Notes', () => {
    let creditNoteID = '';
    it('get', done => {
      currentApp.core.creditNotes
        .getCreditNotes()
        .then(creditNotes => {
          expect(creditNotes).to.have.length.greaterThan(0);
          creditNotes.forEach(creditNote => {
            // Check the contact
            if (creditNote.Contact) {
              expect(creditNote.Contact.ContactID).to.not.equal('');
              expect(creditNote.Contact.ContactID).to.not.equal(undefined);
              expect(creditNote.Contact.Name).to.not.equal('');
              expect(creditNote.Contact.Name).to.not.equal(undefined);
            } else {
              console.error('Credit note has no contact record');
            }

            expect(creditNote.Date).to.not.equal('');
            expect(creditNote.Date).to.not.equal(undefined);

            expect(creditNote.Status).to.be.oneOf([
              'DRAFT',
              'SUBMITTED',
              'DELETED',
              'AUTHORISED',
              'PAID',
              'VOIDED',
            ]);
            expect(creditNote.LineAmountTypes).to.be.oneOf([
              'Exclusive',
              'Inclusive',
              'NoTax',
            ]);

            expect(creditNote.SubTotal).to.be.a('Number');
            expect(creditNote.SubTotal).to.be.at.least(0);
            expect(creditNote.TotalTax).to.be.a('Number');
            expect(creditNote.TotalTax).to.be.at.least(0);
            expect(creditNote.Total).to.be.a('Number');
            expect(creditNote.Total).to.be.at.least(0);

            expect(creditNote.UpdatedDateUTC).to.not.equal('');
            expect(creditNote.UpdatedDateUTC).to.not.equal(undefined);

            expect(creditNote.CurrencyCode).to.not.equal('');
            expect(creditNote.CurrencyCode).to.not.equal(undefined);

            if (creditNote.FullyPaidOnDate) {
              expect(creditNote.FullyPaidOnDate).to.not.equal('');
            }

            expect(creditNote.Type).to.be.oneOf([
              'ACCPAYCREDIT',
              'ACCRECCREDIT',
            ]);

            expect(creditNote.CreditNoteID).to.not.equal('');
            expect(creditNote.CreditNoteID).to.not.equal(undefined);

            if (creditNote.Status === 'AUTHORISED') {
              // Set the variable for the next test.
              creditNoteID = creditNote.CreditNoteID;

              if (creditNote.CreditNoteNumber) {
                expect(creditNote.CreditNoteNumber).to.not.equal('');
              }

              if (creditNote.CurrencyRate) {
                expect(creditNote.CurrencyRate).to.be.a('Number');
                expect(creditNote.CurrencyRate).to.be.at.least(0);
              }

              if (creditNote.RemainingCredit) {
                expect(creditNote.RemainingCredit).to.be.a('Number');
                expect(creditNote.RemainingCredit).to.be.at.least(0);
              }

              if (creditNote.Allocations) {
                creditNote.Allocations.forEach(allocation => {
                  if (allocation.AppliedAmount) {
                    expect(allocation.AppliedAmount).to.be.a('Number');
                    expect(allocation.AppliedAmount).to.be.at.least(0);
                  }

                  if (allocation.Invoice) {
                    expect(allocation.Invoice.InvoiceID).to.not.equal('');
                    expect(allocation.Invoice.InvoiceID).to.not.equal(
                      undefined
                    );
                  } else {
                    console.error(
                      'Credit note allocation has no invoice record'
                    );
                  }
                });
              } else {
                console.error('Credit note has no allocation records');
              }
            }
          });
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('get a single credit note', done => {
      currentApp.core.creditNotes
        .getCreditNote(creditNoteID)
        .then(creditNote => {
          // Check the contact
          if (creditNote.Contact) {
            expect(creditNote.Contact.ContactID).to.not.equal('');
            expect(creditNote.Contact.ContactID).to.not.equal(undefined);
            expect(creditNote.Contact.Name).to.not.equal('');
            expect(creditNote.Contact.Name).to.not.equal(undefined);
          } else {
            console.error('Credit note has no contact record');
          }

          expect(creditNote.Date).to.not.equal('');
          expect(creditNote.Date).to.not.equal(undefined);

          expect(creditNote.Status).to.be.oneOf([
            'DRAFT',
            'SUBMITTED',
            'DELETED',
            'AUTHORISED',
            'PAID',
            'VOIDED',
          ]);
          expect(creditNote.LineAmountTypes).to.be.oneOf([
            'Exclusive',
            'Inclusive',
            'NoTax',
          ]);

          expect(creditNote.SubTotal).to.be.a('Number');
          expect(creditNote.SubTotal).to.be.at.least(0);
          expect(creditNote.TotalTax).to.be.a('Number');
          expect(creditNote.TotalTax).to.be.at.least(0);
          expect(creditNote.Total).to.be.a('Number');
          expect(creditNote.Total).to.be.at.least(0);

          expect(creditNote.UpdatedDateUTC).to.not.equal('');
          expect(creditNote.UpdatedDateUTC).to.not.equal(undefined);

          expect(creditNote.CurrencyCode).to.not.equal('');
          expect(creditNote.CurrencyCode).to.not.equal(undefined);

          if (creditNote.FullyPaidOnDate) {
            expect(creditNote.FullyPaidOnDate).to.not.equal('');
          }

          expect(creditNote.Type).to.be.oneOf(['ACCPAYCREDIT', 'ACCRECCREDIT']);

          expect(creditNote.CreditNoteID).to.not.equal('');
          expect(creditNote.CreditNoteID).to.not.equal(undefined);

          // Set the variable for the next test.
          creditNoteID = creditNote.CreditNoteID;

          if (creditNote.Status === 'AUTHORISED') {
            if (creditNote.CreditNoteNumber) {
              expect(creditNote.CreditNoteNumber).to.not.equal('');
            }

            if (creditNote.CurrencyRate) {
              expect(creditNote.CurrencyRate).to.be.a('Number');
              expect(creditNote.CurrencyRate).to.be.at.least(0);
            }

            if (creditNote.RemainingCredit) {
              expect(creditNote.RemainingCredit).to.be.a('Number');
              expect(creditNote.RemainingCredit).to.be.at.least(0);
            }

            if (creditNote.Allocations) {
              creditNote.Allocations.forEach(allocation => {
                if (allocation.AppliedAmount) {
                  expect(allocation.AppliedAmount).to.be.a('Number');
                  expect(allocation.AppliedAmount).to.be.at.least(0);
                }

                if (allocation.Invoice) {
                  expect(allocation.Invoice.InvoiceID).to.not.equal('');
                  expect(allocation.Invoice.InvoiceID).to.not.equal(undefined);
                } else {
                  console.error('Credit note allocation has no invoice record');
                }
              });
            } else {
              console.error('Credit note has no allocation records');
            }

            if (creditNote.LineItems) {
              creditNote.LineItems.forEach(lineItem => {
                if (lineItem.LineItemID) {
                  expect(lineItem.LineItemID).to.not.equal('');
                }

                expect(lineItem.Description).to.not.equal('');
                expect(lineItem.Description).to.not.equal(undefined);

                if (lineItem.Quantity) {
                  expect(lineItem.Quantity).to.be.a('Number');
                  expect(lineItem.Quantity).to.be.at.least(0);

                  expect(lineItem.UnitAmount).to.be.a('Number');
                  expect(lineItem.UnitAmount).to.be.at.least(0);

                  if (lineItem.ItemCode) {
                    expect(lineItem.ItemCode).to.be.a('String');
                    expect(lineItem.ItemCode).to.not.equal('');
                    expect(lineItem.ItemCode).to.not.equal(undefined);
                  }

                  expect(lineItem.AccountCode).to.be.a('String');
                  expect(lineItem.AccountCode).to.not.equal('');
                  expect(lineItem.AccountCode).to.not.equal(undefined);

                  expect(lineItem.TaxType).to.not.equal('');
                  expect(lineItem.TaxType).to.not.equal(undefined);

                  expect(lineItem.TaxAmount).to.be.a('Number');
                  expect(lineItem.TaxAmount).to.be.at.least(0);

                  expect(lineItem.LineAmount).to.be.a('Number');
                  expect(lineItem.LineAmount).to.be.at.least(0);

                  if (lineItem.Tracking) {
                    lineItem.Tracking.forEach(trackingCategory => {
                      expect(trackingCategory.Name).to.not.equal('');
                      expect(trackingCategory.Name).to.not.equal(undefined);

                      expect(trackingCategory.Option).to.not.equal('');
                      expect(trackingCategory.Option).to.not.equal(undefined);

                      expect(trackingCategory.TrackingCategoryID).to.not.equal(
                        ''
                      );
                      expect(trackingCategory.TrackingCategoryID).to.not.equal(
                        undefined
                      );

                      expect(trackingCategory.TrackingOptionID).to.not.equal(
                        ''
                      );
                      expect(trackingCategory.TrackingOptionID).to.not.equal(
                        undefined
                      );
                    });
                  }
                }
              });
            } else {
              console.error('Credit note has no line item records');
            }
          }
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('creates a draft credit note', done => {
      const creditNoteData = {
        Type: 'ACCPAYCREDIT',
        Contact: {
          ContactID: '',
        },
        LineItems: [
          {
            Description: 'MacBook - White',
            Quantity: 1,
            UnitAmount: 1995.0,
            AccountCode: salesAccount,
          },
        ],
      };

      currentApp.core.contacts
        .getContacts()
        .then(contacts => {
          creditNoteData.Contact.ContactID = contacts[0].ContactID;

          const creditNote = currentApp.core.creditNotes.newCreditNote(
            creditNoteData
          );

          creditNote
            .save()
            .then(creditNotes => {
              expect(creditNotes.entities).to.have.length(1);
              const thisNote = creditNotes.entities[0];

              creditNoteID = thisNote.CreditNoteID;

              expect(thisNote.Type).to.equal(creditNoteData.Type);
              expect(thisNote.Contact.ContactID).to.equal(
                creditNoteData.Contact.ContactID
              );

              thisNote.LineItems.forEach(lineItem => {
                expect(lineItem.Description).to.equal(
                  creditNoteData.LineItems[0].Description
                );
                expect(lineItem.Quantity).to.equal(
                  creditNoteData.LineItems[0].Quantity
                );
                expect(lineItem.UnitAmount).to.equal(
                  creditNoteData.LineItems[0].UnitAmount
                );
                if (lineItem.AccountCode) {
                  expect(lineItem.AccountCode.toLowerCase()).to.equal(
                    creditNoteData.LineItems[0].AccountCode.toLowerCase()
                  );
                }
              });

              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('approves a credit note', done => {
      // Get the draft credit note, update it, and save it.
      currentApp.core.creditNotes
        .getCreditNote(creditNoteID)
        .then(response => {
          const creditNote = response;
          creditNote.Status = 'AUTHORISED';
          creditNote.Date = new Date().toISOString().split('T')[0];

          return creditNote.save();
        })
        .then(response => {
          expect(response.entities).to.have.length(1);
          const creditNote = response.entities[0];
          expect(creditNote.Status).to.equal('AUTHORISED');
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('adds an allocation to a credit note', done => {
      currentApp.core.invoices
        .getInvoices({
          where: 'Type == "ACCPAY" and Status == "AUTHORISED"',
        })
        .then(invoices => {
          console.warn(invoices);
          expect(invoices).to.have.length.greaterThan(0);

          const myInvoice = invoices[0];
          const myContact = myInvoice.Contact;
          const myCreditNoteAmount = myInvoice.AmountDue / 2; // 50% of total amount left

          // Create the credit note.
          const creditNoteData = {
            Type: 'ACCPAYCREDIT',
            Contact: {
              ContactID: myContact.ContactID,
            },
            LineItems: [
              {
                Description: 'Credit',
                Quantity: 1,
                UnitAmount: myCreditNoteAmount,
                AccountCode: salesAccount,
              },
            ],
            Status: 'AUTHORISED',
            Date: new Date().toISOString().split('T')[0],
          };

          const creditNote = currentApp.core.creditNotes.newCreditNote(
            creditNoteData
          );

          creditNote
            .save()
            .then(creditNotes => {
              expect(creditNotes.entities).to.have.length(1);
              const thisNote = creditNotes.entities[0];

              // Now apply the allocation to the original invoice.
              const allocations = [
                {
                  AppliedAmount: myCreditNoteAmount,
                  InvoiceID: myInvoice.InvoiceID,
                },
              ];

              thisNote
                .saveAllocations(allocations)
                .then(() => {
                  // console.error(res);
                  done();
                })
                .catch(err => {
                  console.error(util.inspect(err, null, null));
                  done(wrapError(err));
                });
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
  });

  describe('currencies', () => {
    it('get', done => {
      currentApp.core.currencies
        .getCurrencies()
        .then(currencies => {
          expect(currencies).to.have.length.greaterThan(0);
          currencies.forEach(currency => {
            expect(currency.Code).to.not.equal(undefined);
            expect(currency.Code).to.not.equal('');
            expect(currency.Description).to.not.equal(undefined);
            expect(currency.Description).to.not.equal('');
          });
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });
  });

  describe('Invoice Reminders', () => {
    it('get', done => {
      currentApp.core.invoiceReminders
        .getInvoiceReminders()
        .then(invoiceReminders => {
          expect(invoiceReminders).to.have.length.greaterThan(0);
          invoiceReminders.forEach(invoiceReminder => {
            expect(invoiceReminder.Enabled).to.be.oneOf([true, false]);
          });
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });
  });

  describe('branding themes', () => {
    let brandingThemeID = '';

    it('get', done => {
      currentApp.core.brandingThemes
        .getBrandingThemes()
        .then(brandingThemes => {
          expect(brandingThemes).to.have.length.greaterThan(0);
          brandingThemes.forEach(brandingTheme => {
            expect(brandingTheme.BrandingThemeID).to.not.equal(undefined);
            expect(brandingTheme.BrandingThemeID).to.not.equal('');
            expect(brandingTheme.Name).to.not.equal(undefined);
            expect(brandingTheme.Name).to.not.equal('');

            brandingThemeID = brandingTheme.BrandingThemeID;
          });
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('get by ID', done => {
      currentApp.core.brandingThemes
        .getBrandingTheme(brandingThemeID)
        .then(brandingTheme => {
          expect(brandingTheme.BrandingThemeID).to.not.equal(undefined);
          expect(brandingTheme.BrandingThemeID).to.not.equal('');
          expect(brandingTheme.Name).to.not.equal(undefined);
          expect(brandingTheme.Name).to.not.equal('');

          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });
  });

  describe('taxRates', () => {
    let createdTaxRate;

    it('gets tax rates', done => {
      currentApp.core.taxRates
        .getTaxRates()
        .then(taxRates => {
          // This test requires that some tax rates are set up in the targeted company
          expect(taxRates).to.have.length.greaterThan(0);
          taxRates.forEach(taxRate => {
            expect(taxRate.Name).to.not.equal('');
            expect(taxRate.Name).to.not.equal(undefined);
            expect(taxRate.TaxType).to.not.equal('');
            expect(taxRate.TaxType).to.not.equal(undefined);
            expect(taxRate.CanApplyToAssets).to.be.oneOf([true, false]);
            expect(taxRate.CanApplyToEquity).to.be.oneOf([true, false]);
            expect(taxRate.CanApplyToExpenses).to.be.oneOf([true, false]);
            expect(taxRate.CanApplyToLiabilities).to.be.oneOf([true, false]);
            expect(taxRate.CanApplyToRevenue).to.be.oneOf([true, false]);
            expect(taxRate.DisplayTaxRate).to.be.a('Number');
            expect(taxRate.Status).to.be.oneOf([
              'ACTIVE',
              'DELETED',
              'ARCHIVED',
            ]);
            expect(taxRate.TaxComponents).to.have.length.greaterThan(0);

            taxRate.TaxComponents.forEach(taxComponent => {
              expect(taxComponent.Name).to.not.equal('');
              expect(taxComponent.Name).to.not.equal(undefined);
              expect(taxComponent.Rate).to.be.a('String');
              expect(taxComponent.IsCompound).to.be.oneOf([true, false]);
            });
          });
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('creates a new tax rate', done => {
      const taxrate = {
        Name: '20% GST on Expenses',
        TaxComponents: [
          {
            Name: 'GST',
            Rate: 20.1234,
            IsCompound: false,
          },
        ],
      };

      if (['AU', 'NZ', 'UK'].indexOf(organisationCountry) > -1) {
        // we're an Org country that needs a report tax type so:
        taxrate.ReportTaxType = 'INPUT';
      }

      const taxRate = currentApp.core.taxRates.newTaxRate(taxrate);

      taxRate
        .save()
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);
          createdTaxRate = response.entities[0];

          expect(createdTaxRate.Name).to.equal(taxrate.Name);
          expect(createdTaxRate.TaxType).to.match(/TAX[0-9]{3}/);
          expect(createdTaxRate.CanApplyToAssets).to.be.oneOf([true, false]);
          expect(createdTaxRate.CanApplyToEquity).to.be.oneOf([true, false]);
          expect(createdTaxRate.CanApplyToExpenses).to.be.oneOf([true, false]);
          expect(createdTaxRate.CanApplyToLiabilities).to.be.oneOf([
            true,
            false,
          ]);
          expect(createdTaxRate.CanApplyToRevenue).to.be.oneOf([true, false]);
          expect(createdTaxRate.DisplayTaxRate).to.equal(
            taxrate.TaxComponents[0].Rate
          );
          expect(createdTaxRate.EffectiveRate).to.equal(
            taxrate.TaxComponents[0].Rate
          );
          expect(createdTaxRate.Status).to.equal('ACTIVE');
          expect(createdTaxRate.ReportTaxType).to.equal(taxrate.ReportTaxType);

          createdTaxRate.TaxComponents.forEach(taxComponent => {
            expect(taxComponent.Name).to.equal(taxrate.TaxComponents[0].Name);

            // This is hacked toString() because of: https://github.com/jordanwalsh23/xero-node/issues/13
            expect(taxComponent.Rate).to.equal(
              taxrate.TaxComponents[0].Rate.toString()
            );
            expect(taxComponent.IsCompound).to.equal(
              taxrate.TaxComponents[0].IsCompound
            );
          });
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('updates the taxrate to DELETED', done => {
      createdTaxRate
        .delete()
        .then(response => {
          expect(response.entities).to.have.lengthOf(1);
          expect(response.entities[0].Status).to.equal('DELETED');
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });
  });

  describe('invoices', () => {
    it('create invoice', done => {
      const invoice = currentApp.core.invoices.newInvoice({
        Type: 'ACCREC',
        Contact: {
          Name: 'Department of Testing',
        },
        DueDate: new Date().toISOString().split('T')[0],
        LineItems: [
          {
            Description: 'Services',
            Quantity: 2,
            UnitAmount: 230,
            AccountCode: salesAccount,
          },
        ],
      });
      invoice
        .save({ unitdp: 4 })
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);

          const thisInvoice = response.entities[0];
          InvoiceID = thisInvoice.InvoiceID;

          expect(response.entities[0].InvoiceID).to.not.equal(undefined);
          expect(response.entities[0].InvoiceID).to.not.equal('');

          thisInvoice.LineItems.forEach(lineItem => {
            expect(lineItem.UnitAmount).to.match(/[0-9]+\.?[0-9]{0,4}/);
          });

          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get invoices', done => {
      currentApp.core.invoices
        .getInvoices()
        .then(invoices => {
          expect(invoices).to.have.length.greaterThan(0);

          invoices.forEach(invoice => {
            expect(invoice.InvoiceID).to.not.equal('');
            expect(invoice.InvoiceID).to.not.equal(undefined);
          });

          done();
        })
        .catch(err => {
          done(wrapError(err));
        });
    });
    it('get invoice', done => {
      currentApp.core.invoices
        .getInvoice(InvoiceID)
        .then(invoice => {
          expect(invoice.InvoiceID).to.not.equal('');
          expect(invoice.InvoiceID).to.not.equal(undefined);
          done();
        })
        .catch(err => {
          done(wrapError(err));
        });
    });
    it('update invoice', done => {
      currentApp.core.invoices
        .getInvoice(InvoiceID)
        .then(response => {
          const invoice = response;
          invoice.LineItems.push({
            Description: 'Test',
            Quantity: 1,
            UnitAmount: 200,
            AccountCode: salesAccount,
          });
          invoice.Status = 'AUTHORISED';
          return invoice.save();
        })
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);

          response.entities.forEach(thisInvoice => {
            expect(thisInvoice.InvoiceID).to.not.equal('');
            expect(thisInvoice.InvoiceID).to.not.equal(undefined);
          });
          done();
        })
        .catch(err => {
          done(wrapError(err));
        });
    });

    it('saves multiple invoices', done => {
      const invoices = [];

      for (let i = 0; i < 10; i += 1) {
        invoices.push(
          currentApp.core.invoices.newInvoice({
            Type: 'ACCREC',
            Contact: {
              Name: 'Department of Testing',
            },
            DueDate: new Date().toISOString().split('T')[0],
            LineItems: [
              {
                Description: 'Services',
                Quantity: 2,
                UnitAmount: 230,
                AccountCode: salesAccount,
              },
            ],
          })
        );
      }

      currentApp.core.invoices
        .saveInvoices(invoices)
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(9);
          done();
        })
        .catch(err => {
          done(wrapError(err));
        });
    });
  });

  describe('payments', () => {
    /* Please note that this test pays an invoice created in the previous tests */

    let testAccountCode;

    before('create an account to pay into', () => {
      const randomString = uuid.v4();

      const testAccountData = {
        Code: randomString.replace(/-/g, '').substring(0, 10),
        Name: `Test account from Node SDK ${randomString}`,
        Type: 'SALES',
        EnablePaymentsToAccount: true,
      };

      testAccountCode = testAccountData.Code;

      const account = currentApp.core.accounts.newAccount(testAccountData);

      return account.save();
    });

    it('Create Payment', done => {
      const payment = currentApp.core.payments.newPayment({
        Invoice: {
          InvoiceID,
        },
        Account: {
          Code: testAccountCode,
        },
        Date: new Date().toISOString().split('T')[0],
        Amount: '660',
      });

      payment
        .save()
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);

          PaymentID = response.entities[0].PaymentID;
          expect(PaymentID).to.not.equal('');
          expect(PaymentID).to.not.equal(undefined);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('Retrieve Payments', done => {
      currentApp.core.payments
        .getPayments()
        .then(payments => {
          expect(payments).to.have.length.greaterThan(0);
          payments.forEach(payment => {
            expect(payment.PaymentID).to.not.equal(undefined);
            expect(payment.PaymentID).to.not.equal('');
          });
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('Retrieve Single Payment', done => {
      currentApp.core.payments
        .getPayment(PaymentID)
        .then(payment => {
          expect(payment.PaymentID).to.not.equal('');
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('Update Payment', done => {
      const paymentToDelete = currentApp.core.payments.newPayment({
        PaymentID,
        Status: 'DELETED',
      });

      paymentToDelete
        .save()
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);
          expect(response.entities[0].Status).to.equal('DELETED');
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('Delete Payment', () => {
      // NOT CURRENTLY SUPPORTED.
      // Use update Payment with Payment.Status = DELETED.
    });
  });

  describe('bank transactions', () => {
    let sharedTransaction;

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
            AccountCode: expenseAccount,
          },
        ],
        BankAccount: {
          AccountID: bankAccounts[0].id,
        },
      });

      transaction
        .save()
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);
          expect(response.entities[0].BankTransactionID).to.not.equal('');
          expect(response.entities[0].BankTransactionID).to.not.equal(
            undefined
          );
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

  describe('bank transfers', () => {
    let sampleTransferID = '';

    it('create sample bank transfer', done => {
      const transfer = currentApp.core.bankTransfers.newBankTransfer({
        FromBankAccount: {
          Code: bankAccounts[0].account.Code,
        },
        ToBankAccount: {
          Code: bankAccounts[1].account.Code,
        },
        Amount: '20.00',
      });
      transfer
        .save()
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);
          expect(response.entities[0].BankTransferID).to.not.equal('');
          expect(response.entities[0].BankTransferID).to.not.equal(undefined);

          sampleTransferID = response.entities[0].BankTransferID;
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get (no paging)', done => {
      currentApp.core.bankTransfers
        .getBankTransfers()
        .then(bankTransfers => {
          bankTransfers.forEach(bankTransfer => {
            expect(bankTransfer.BankTransferID).to.not.equal('');
            expect(bankTransfer.BankTransferID).to.not.equal(undefined);
          });
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get single bank transfer', done => {
      currentApp.core.bankTransfers
        .getBankTransfer(sampleTransferID)
        .then(bankTransfer => {
          expect(bankTransfer.BankTransferID).to.not.equal('');
          expect(bankTransfer.BankTransferID).to.not.equal(undefined);
          expect(bankTransfer.BankTransferID).to.equal(sampleTransferID);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
  });

  describe('tracking categories', () => {
    let sampleTrackingCategory = {
      Name: 'My First Category',
    };

    it('creates a tracking category', done => {
      const myTrackingCategory = currentApp.core.trackingCategories.newTrackingCategory(
        sampleTrackingCategory
      );

      myTrackingCategory
        .save()
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);
          expect(response.entities[0].TrackingCategoryID).to.not.equal('');
          expect(response.entities[0].TrackingCategoryID).to.not.equal(
            undefined
          );
          expect(response.entities[0].Name).to.equal(
            sampleTrackingCategory.Name
          );
          sampleTrackingCategory = response.entities[0];
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates some options for the tracking category', done => {
      const TrackingOptions = [
        {
          Name: 'up',
        },
        {
          Name: 'down',
        },
      ];

      sampleTrackingCategory
        .saveTrackingOptions(TrackingOptions)
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);

          response.entities.forEach(trackingOption => {
            expect(trackingOption.Name).to.not.equal('');
            expect(trackingOption.Name).to.not.equal(undefined);
            expect(trackingOption.Status).to.equal('ACTIVE');
          });
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('updates one of the options for the tracking category', done => {
      const TrackingOptions = {
        Name: 'left',
      };

      currentApp.core.trackingCategories
        .getTrackingCategory(sampleTrackingCategory.TrackingCategoryID)
        .then(trackingCategory => {
          // console.error(response.Options[0].TrackingOptionID)

          const optionIDtoUpdate = trackingCategory.Options[0].TrackingOptionID;

          trackingCategory
            .saveTrackingOptions(TrackingOptions, optionIDtoUpdate)
            .then(response => {
              expect(response.entities).to.have.length.greaterThan(0);
              expect(response.entities[0].Name).to.equal('left');
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('deletes the tracking category', done => {
      currentApp.core.trackingCategories
        .deleteTrackingCategory(sampleTrackingCategory.TrackingCategoryID)
        .then(() => {
          // console.error(response);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('Uses a tracking category on an invoice - REGION', done => {
      // TODO refactor this setup and teardown into hooks
      // Create the tracking category

      const trackingCategory = currentApp.core.trackingCategories.newTrackingCategory(
        {
          Name: uuid.v4(),
        }
      );

      let trackingCategoryName;
      let trackingCategoryID;

      trackingCategory
        .save()
        .then(response => {
          trackingCategoryName = response.entities[0].Name;
          trackingCategoryID = response.entities[0].TrackingCategoryID;
          response.entities[0].saveTrackingOptions([
            { Name: 'North' },
            { Name: 'South' },
          ]);
        })
        .then(() =>
          // Create an invoice with the sample tracking category attached to the line item on the invoice.
          currentApp.core.invoices.newInvoice({
            Type: 'ACCREC',
            Contact: {
              Name: 'Department of Testing',
            },
            DueDate: new Date().toISOString().split('T')[0],
            LineItems: [
              {
                Description: 'Services',
                Quantity: 2,
                UnitAmount: 230,
                AccountCode: salesAccount,
                Tracking: [
                  {
                    TrackingCategory: {
                      Name: trackingCategoryName,
                      Option: 'North',
                    },
                  },
                ],
              },
            ],
          })
        )
        .then(invoice => invoice.save())
        .then(invoices => {
          expect(invoices.entities).to.have.length.greaterThan(0);

          const thisInvoice = invoices.entities[0];

          expect(thisInvoice.InvoiceID).to.not.equal(undefined);
          expect(thisInvoice.InvoiceID).to.not.equal('');

          thisInvoice.LineItems.forEach(lineItem => {
            // expect(lineItem.Tracking).to.have.length.greaterThan(0);
            lineItem.Tracking.forEach(thisTrackingCategory => {
              expect(thisTrackingCategory.TrackingCategoryID).to.not.equal(
                undefined
              );
              expect(thisTrackingCategory.TrackingCategoryID).to.not.equal('');
              expect(thisTrackingCategory.TrackingOptionID).to.not.equal(
                undefined
              );
              expect(thisTrackingCategory.TrackingOptionID).to.not.equal('');
              expect(thisTrackingCategory.Name).to.equal(trackingCategory.Name);
              expect(thisTrackingCategory.Option).to.equal('North');
            });
          });
          currentApp.core.trackingCategories.deleteTrackingCategory(
            trackingCategoryID
          );
        })
        .then(() => done())
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    // unfortunately this will only work on tracking categories that have been used.
    it.skip('archives a tracking category', done => {
      sampleTrackingCategory.Status = 'ARCHIVED';

      sampleTrackingCategory
        .save()
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);
          expect(response.entities[0].TrackingCategoryID).to.not.equal('');
          expect(response.entities[0].TrackingCategoryID).to.not.equal(
            undefined
          );
          expect(response.entities[0].Name).to.equal(
            sampleTrackingCategory.Name
          );
          expect(response.entities[0].Status).to.equal(
            sampleTrackingCategory.Status
          );
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
  });

  describe('items', () => {
    const sampleItem = {
      Code: `Item-${Math.random()}`,
      Name: 'Fully Tracked Item',
      Description: '2014 Merino Sweater',
      PurchaseDescription: '2014 Merino Sweater',
      PurchaseDetails: {
        UnitPrice: 149.0,
        AccountCode: salesAccount,
      },
      SalesDetails: {
        UnitPrice: 299.0,
        AccountCode: salesAccount,
      },
    };

    it('creates an item', done => {
      const item = currentApp.core.items.newItem(sampleItem);

      item
        .save()
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);
          expect(response.entities[0].ItemID).to.not.equal('');
          expect(response.entities[0].ItemID).to.not.equal(undefined);
          sampleItem.ItemID = response.entities[0].ItemID;
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('saves multiple items', done => {
      const items = [];

      for (let i = 0; i < 10; i += 1) {
        sampleItem.Code = `Item-${Math.random()}`;
        items.push(currentApp.core.items.newItem(sampleItem));
      }

      currentApp.core.items
        .saveItems(items)
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(9);
          done();
        })
        .catch(err => {
          done(wrapError(err));
        });
    });

    it('retrieves some items (no paging)', done => {
      currentApp.core.items
        .getItems()
        .then(items => {
          items.forEach(item => {
            expect(item.ItemID).to.not.equal('');
            expect(item.ItemID).to.not.equal(undefined);
          });
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('retrieves an item by ID', done => {
      currentApp.core.items
        .getItem(sampleItem.ItemID)
        .then(item => {
          expect(item.ItemID).to.equal(sampleItem.ItemID);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('updates an item by ID', done => {
      const randomName = `Updated ${Math.random()}`;

      currentApp.core.items
        .getItem(sampleItem.ItemID)
        .then(response => {
          const item = response;
          expect(item.ItemID).to.equal(sampleItem.ItemID);
          item.Name = randomName;
          return item.save();
        })
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);
          expect(response.entities[0].Name).to.equal(randomName);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('deletes an item', done => {
      currentApp.core.items
        .deleteItem(sampleItem.ItemID)
        .then(() => {
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
  });

  describe('contacts', () => {
    let sampleContact = {
      Name: `Johnnies Coffee${Math.random()}`,
      FirstName: 'John',
      LastName: 'Smith',
      EmailAddress: 'John.Smith@example.com',
      SkypeUserName: 'jonnysmith',
      ContactPersons: [
        {
          FirstName: 'Sally',
          LastName: 'Smith',
          EmailAddress: 'Sally.Smith@example.com',
          IncludeInEmails: false,
        },
      ],
      Phones: [
        {
          PhoneNumber: '86000000',
          PhoneAreaCode: '03',
          PhoneCountryCode: '61',
          PhoneType: 'DEFAULT',
        },
        {
          PhoneNumber: '86000001',
          PhoneAreaCode: '03',
          PhoneCountryCode: '61',
          PhoneType: 'DDI',
        },
        {
          PhoneNumber: '86000002',
          PhoneAreaCode: '03',
          PhoneCountryCode: '61',
          PhoneType: 'FAX',
        },
        {
          PhoneNumber: '20000000',
          PhoneAreaCode: '04',
          PhoneCountryCode: '61',
          PhoneType: 'MOBILE',
        },
      ],
      BankAccountDetails: '01-0123-0123456-00',
    };

    it('create single contact', done => {
      const contact = currentApp.core.contacts.newContact(sampleContact);
      contact
        .save()
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);
          expect(response.entities[0].ContactID).to.not.equal('');
          expect(response.entities[0].ContactID).to.not.equal(undefined);
          expect(response.entities[0].Name).to.equal(sampleContact.Name);
          expect(response.entities[0].FirstName).to.equal(
            sampleContact.FirstName
          );
          expect(response.entities[0].LastName).to.equal(
            sampleContact.LastName
          );
          expect(response.entities[0].SkypeUserName).to.equal(
            sampleContact.SkypeUserName
          );
          expect(response.entities[0].EmailAddress).to.equal(
            sampleContact.EmailAddress
          );
          expect(response.entities[0].BankAccountDetails).to.equal(
            sampleContact.BankAccountDetails
          );

          response.entities[0].ContactPersons.forEach((contactPerson, idx) => {
            expect(contactPerson.FirstName).to.equal(
              sampleContact.ContactPersons[idx].FirstName
            );
            expect(contactPerson.LastName).to.equal(
              sampleContact.ContactPersons[idx].LastName
            );
            expect(contactPerson.EmailAddress).to.equal(
              sampleContact.ContactPersons[idx].EmailAddress
            );
            expect(contactPerson.IncludeInEmails).to.equal(
              sampleContact.ContactPersons[idx].IncludeInEmails
            );
          });

          response.entities[0].Phones.forEach((phone, idx) => {
            expect(phone.PhoneNumber).to.equal(
              sampleContact.Phones[idx].PhoneNumber
            );
            expect(phone.PhoneAreaCode).to.equal(
              sampleContact.Phones[idx].PhoneAreaCode
            );
            expect(phone.PhoneCountryCode).to.equal(
              sampleContact.Phones[idx].PhoneCountryCode
            );
            expect(phone.PhoneType).to.equal(
              sampleContact.Phones[idx].PhoneType
            );
          });

          sampleContact = response.entities[0];

          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });

    it('get - modifiedAfter', done => {
      const modifiedAfter = new Date();

      // take 60 seconds ago as we just created a contact
      modifiedAfter.setTime(modifiedAfter.getTime() - 60000);

      currentApp.core.contacts
        .getContacts({ modifiedAfter })
        .then(contacts => {
          expect(contacts.length).to.equal(1);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get (no paging)', done => {
      currentApp.core.contacts
        .getContacts()
        .then(contacts => {
          contacts.forEach(contact => {
            expect(contact.ContactID).to.not.equal('');
            expect(contact.ContactID).to.not.equal(undefined);
          });
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
    it('get (paging)', done => {
      const onContacts = (err, response, cb) => {
        cb();
        try {
          response.data.forEach(contact => {
            expect(contact.ContactID).to.not.equal('');
            expect(contact.ContactID).to.not.equal(undefined);
          });

          if (response.finished) done();
        } catch (ex) {
          console.error(util.inspect(err, null, null));
          done(ex);
        }
      };

      currentApp.core.contacts
        .getContacts({ pager: { start: 1, callback: onContacts } })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get by id', done => {
      currentApp.core.contacts
        .getContact(sampleContact.ContactID)
        .then(contact => {
          expect(contact.ContactID).to.equal(sampleContact.ContactID);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get - invalid modified date', done => {
      currentApp.core.contacts
        .getContacts({ modifiedAfter: 'cats' })
        .then(contacts => {
          expect(contacts.length).to.be.greaterThan(1);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('create multiple contacts', done => {
      const contacts = [];
      contacts.push(
        currentApp.core.contacts.newContact({
          Name: `Johnnies Coffee${Math.random()}`,
          FirstName: `John${Math.random()}`,
          LastName: 'Smith',
        })
      );
      contacts.push(
        currentApp.core.contacts.newContact({
          Name: `Johnnies Coffee${Math.random()}`,
          FirstName: `John${Math.random()}`,
          LastName: 'Smith',
        })
      );
      currentApp.core.contacts
        .saveContacts(contacts)
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);
          response.entities.forEach(contact => {
            expect(contact.ContactID).to.not.equal('');
            expect(contact.ContactID).to.not.equal(undefined);
          });
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('update contact', done => {
      const newName = `Updated${Math.random()}`;

      currentApp.core.contacts
        .getContact(sampleContact.ContactID)
        .then(response => {
          const contact = response;
          expect(contact.ContactID).to.equal(sampleContact.ContactID);

          contact.Name = newName;
          contact.EmailAddress = `${contact.FirstName}.${contact.LastName}@gmail.com`;
          contact.ContactPersons = [
            {
              FirstName: 'Johnny',
              LastName: 'Scribgibbons',
              EmailAddress: 'j.scribgib@gribbons.com',
              IncludeInEmails: true,
            },
          ];
          contact.Addresses = [
            {
              AddressLine1: '15 Scriby Street',
              AddressLine2: 'Preston',
              AddressLine3: 'Prestonville',
              AddressLine4: 'Scribeystanistan',
              City: 'Melbourne',
              Region: 'Victoria',
              PostalCode: '3000',
              Country: 'Australia',
              AttentionTo: 'Johnny',
              AddressType: 'STREET',
            },
          ];
          return contact.save();
        })
        .then(updatedContact => {
          expect(updatedContact.response.Contacts.Contact.Name).to.equal(
            newName
          );
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
    it('get attachments for contacts', done => {
      currentApp.core.contacts
        .getContact(sampleContact.ContactID)
        .then(contact => {
          expect(contact.ContactID).to.equal(sampleContact.ContactID);
          contact
            .getAttachments()
            .then(() => {
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
  });

  describe('journals', () => {
    let sampleJournalId = '';

    it('get (paging with callback)', done => {
      let recordCount = 0;
      const onJournals = (err, ret, cb) => {
        cb();
        recordCount += ret.data.length;
        ret.data.forEach(journal => {
          expect(journal.JournalID).to.not.equal('');
          expect(journal.JournalID).to.not.equal(undefined);
          expect(journal.JournalLines).to.have.length.at.least(0);
        });

        try {
          if (ret.finished) {
            console.error(`Journals record count: ${recordCount}`);
            done();
          }
        } catch (ex) {
          console.error(util.inspect(ex, null, null));
          done(ex);
        }
      };

      currentApp.core.journals
        .getJournals({ pager: { start: 1, callback: onJournals } })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get (paging no callback)', done => {
      currentApp.core.journals
        .getJournals({ pager: { start: 1, callback: undefined } })
        .then(journals => {
          expect(journals).to.not.equal(undefined);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get (no paging)', done => {
      currentApp.core.journals
        .getJournals()
        .then(journals => {
          expect(journals).to.not.equal(undefined);
          expect(journals).to.be.an('Array');
          expect(journals).to.have.length.greaterThan(0);

          sampleJournalId = journals[0].JournalID;
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get single journal', done => {
      currentApp.core.journals
        .getJournal(sampleJournalId)
        .then(journal => {
          expect(journal).to.be.an('Object');
          expect(journal.JournalID).to.equal(sampleJournalId);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
  });

  describe('users', () => {
    it('retrieves a list of users', done => {
      currentApp.core.users
        .getUsers()
        .then(() => {
          done();
        })
        .catch(err => {
          console.error(err);
          done(wrapError(err));
        });
    });
  });

  describe('manualjournals', () => {
    let ManualJournalID = '';

    it('create manual journal', done => {
      const sampleManualJournal = {
        Narration: 'Manual Journal Entry',
        Date: new Date().toISOString().split('T')[0],
        JournalLines: [
          {
            LineAmount: '-1000.00',
            AccountCode: salesAccount,
            TaxType: 'INPUT',
          },
          {
            LineAmount: '1000.00',
            AccountCode: salesAccount,
            TaxType: 'INPUT',
          },
        ],
      };

      const manualjournal = currentApp.core.manualjournals.newManualJournal(
        sampleManualJournal
      );
      manualjournal
        .save()
        .then(response => {
          expect(response.entities).to.have.length.greaterThan(0);

          const manualJournal = response.entities[0];
          ManualJournalID = manualJournal.ManualJournalID;

          expect(response.entities[0].ManualJournalID).to.not.equal(undefined);
          expect(response.entities[0].ManualJournalID).to.not.equal('');
          expect(response.entities[0].Narration).to.equal(
            sampleManualJournal.Narration
          );

          manualJournal.JournalLines.forEach(journalItem => {
            expect(journalItem.LineAmount).to.match(/[0-9]+\.?[0-9]{0,4}/);
          });

          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
    it('get - modifiedAfter', done => {
      const modifiedAfter = new Date();

      // take 20 seconds ago as we just created a contact
      modifiedAfter.setTime(modifiedAfter.getTime() - 60000);

      currentApp.core.manualjournals
        .getManualJournals({ modifiedAfter })
        .then(manualjournals => {
          expect(manualjournals.length).to.equal(1);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get (no paging)', done => {
      currentApp.core.manualjournals
        .getManualJournals()
        .then(manualjournals => {
          manualjournals.forEach(manualJournal => {
            expect(manualJournal.ManualJournalID).to.not.equal('');
            expect(manualJournal.ManualJournalID).to.not.equal(undefined);
          });
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
    it('get (paging)', done => {
      const onManualJournals = (err, response, cb) => {
        cb();
        try {
          response.data.forEach(manualJournal => {
            expect(manualJournal.ManualJournalID).to.not.equal('');
            expect(manualJournal.ManualJournalID).to.not.equal(undefined);
          });

          if (response.finished) done();
        } catch (ex) {
          console.error(util.inspect(err, null, null));
          done(ex);
        }
      };

      currentApp.core.manualjournals
        .getManualJournals({ pager: { start: 1, callback: onManualJournals } })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get by id', done => {
      currentApp.core.manualjournals
        .getManualJournal(ManualJournalID)
        .then(manualjournal => {
          expect(manualjournal.ManualJournalID).to.equal(ManualJournalID);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('get - invalid modified date', done => {
      currentApp.core.manualjournals
        .getManualJournals({ modifiedAfter: 'cats' })
        .then(manualjournals => {
          expect(manualjournals.length).to.be.greaterThan(1);
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('update Manual Journal', done => {
      const newNarration = `Updated${Math.random()}`;
      currentApp.core.manualjournals
        .getManualJournal(ManualJournalID)
        .then(response => {
          const manualJournal = response;
          expect(manualJournal.ManualJournalID).to.equal(ManualJournalID);

          manualJournal.Narration = newNarration;

          return manualJournal.save();
        })
        .then(updatedManualJournal => {
          expect(updatedManualJournal.entities[0].Narration).to.equal(
            newNarration
          );
          done();
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
  });

  /**
   * Attachments should work on the following endpoints:
   *  Invoices
   *  Credit Notes
   *  Bank Transactions
   *  Bank Transfers
   *  Contacts
   *  Accounts
   */

  /** Attachments are not yet supported on the following endpoints:
   *   Receipts
   *   Manual Journals
   *   Repeating Invoices
   */

  describe('attachments', () => {
    let invoiceID = '';
    const files = [];

    after('delete the files that were created', () => {
      files.forEach(file => {
        fs.unlink(file);
      });
    });

    it('creates an attachment on an invoice using a file reference', done => {
      const attachmentTemplate = {
        FileName: '1-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.invoices
        .getInvoices()
        .then(invoices => {
          const sampleInvoice = invoices[0];
          attachmentPlaceholder
            .save(
              `Invoices/${sampleInvoice.InvoiceID}`,
              sampleDataReference,
              false
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              invoiceID = sampleInvoice.InvoiceID;
              console.log(invoiceID);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on an invoice using a file reference and online invoice set to true', done => {
      const attachmentTemplate = {
        FileName: '1-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      const filter = 'Type == "ACCREC"';
      currentApp.core.invoices
        .getInvoices({ where: filter })
        .then(invoices => {
          const sampleInvoice = invoices[0];
          attachmentPlaceholder
            .save(
              `Invoices/${sampleInvoice.InvoiceID}`,
              sampleDataReference,
              false,
              { IncludeOnline: true }
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              expect(thisFile.IncludeOnline).to.equal(true);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('gets the content of an attachment as stream', () => {
      // Add attachment to an Invoice
      currentApp.core.invoices
        .getInvoice(invoiceID)
        .then(invoice => {
          invoice.getAttachments().then(attachments => {
            expect(attachments.length).to.be.at.least(1);

            attachments.forEach((attachment, idx) => {
              const timestamp = new Date().getMilliseconds();

              const filename = `${__dirname}/testdata/test-${idx}-${timestamp}-${attachment.FileName}`;
              files.push(filename);

              const wstream = fs.createWriteStream(filename, {
                defaultEncoding: 'binary',
              });

              wstream.on('error', err => {
                console.error('data writing failed');
                wstream.close();
                throw new Error(err);
              });

              attachment.getContent(wstream).catch(err => {
                console.error(err);
              });
            });
          });
        })
        .catch(err => {
          console.error(err);
        });
    });

    it('creates an attachment on a credit note using a file reference', done => {
      const attachmentTemplate = {
        FileName: '1-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.creditNotes
        .getCreditNotes()
        .then(creditNotes => {
          const sampleCreditNote = creditNotes[0];
          attachmentPlaceholder
            .save(
              `CreditNotes/${sampleCreditNote.CreditNoteID}`,
              sampleDataReference,
              false
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on an banktransaction using a file reference', done => {
      const attachmentTemplate = {
        FileName: '1-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.bankTransactions
        .getBankTransactions()
        .then(bankTransactions => {
          const sampleBankTransaction = bankTransactions[0];
          attachmentPlaceholder
            .save(
              `BankTransactions/${sampleBankTransaction.BankTransactionID}`,
              sampleDataReference,
              false
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on an banktransfer using a file reference', done => {
      const attachmentTemplate = {
        FileName: '1-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.bankTransfers
        .getBankTransfers()
        .then(bankTransfers => {
          const sampleBankTransfer = bankTransfers[0];
          attachmentPlaceholder
            .save(
              `BankTransfers/${sampleBankTransfer.BankTransferID}`,
              sampleDataReference,
              false
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on an contact using a file reference', done => {
      const attachmentTemplate = {
        FileName: '1-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.contacts
        .getContacts()
        .then(contacts => {
          const sampleContact = contacts[0];
          attachmentPlaceholder
            .save(
              `Contacts/${sampleContact.ContactID}`,
              sampleDataReference,
              false
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on an account using a file reference', done => {
      const attachmentTemplate = {
        FileName: '1-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.accounts
        .getAccounts()
        .then(accounts => {
          const sampleAccount = accounts[0];
          attachmentPlaceholder
            .save(
              `Accounts/${sampleAccount.AccountID}`,
              sampleDataReference,
              false
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on a manual journal using a file reference', done => {
      const attachmentTemplate = {
        FileName: '1-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.manualjournals
        .getManualJournals()
        .then(manualJournals => {
          const sampleManualJournal = manualJournals[0];
          attachmentPlaceholder
            .save(
              `ManualJournals/${sampleManualJournal.ManualJournalID}`,
              sampleDataReference,
              false
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    // Using streams instead of files (attachment number 2)
    it('creates an attachment on an invoice using a file stream', done => {
      const attachmentTemplate = {
        FileName: '2-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;

      const dataReadStream = fs.createReadStream(sampleDataReference);
      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.invoices
        .getInvoices()
        .then(invoices => {
          const sampleInvoice = invoices[0];
          attachmentPlaceholder
            .save(`Invoices/${sampleInvoice.InvoiceID}`, dataReadStream, true)
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on a credit note using a file stream', done => {
      const attachmentTemplate = {
        FileName: '2-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
      const dataReadStream = fs.createReadStream(sampleDataReference);
      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.creditNotes
        .getCreditNotes()
        .then(creditNotes => {
          const sampleCreditNote = creditNotes[0];
          attachmentPlaceholder
            .save(
              `CreditNotes/${sampleCreditNote.CreditNoteID}`,
              dataReadStream,
              true
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on an banktransaction using a file stream', done => {
      const attachmentTemplate = {
        FileName: '2-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
      const dataReadStream = fs.createReadStream(sampleDataReference);
      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.bankTransactions
        .getBankTransactions()
        .then(bankTransactions => {
          const sampleBankTransaction = bankTransactions[0];
          attachmentPlaceholder
            .save(
              `BankTransactions/${sampleBankTransaction.BankTransactionID}`,
              dataReadStream,
              true
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on an banktransfer using a file stream', done => {
      const attachmentTemplate = {
        FileName: '1-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
      const dataReadStream = fs.createReadStream(sampleDataReference);
      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.bankTransfers
        .getBankTransfers()
        .then(bankTransfers => {
          const sampleBankTransfer = bankTransfers[0];
          attachmentPlaceholder
            .save(
              `BankTransfers/${sampleBankTransfer.BankTransferID}`,
              dataReadStream,
              true
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on an contact using a file stream', done => {
      const attachmentTemplate = {
        FileName: '2-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
      const dataReadStream = fs.createReadStream(sampleDataReference);
      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.contacts
        .getContacts()
        .then(contacts => {
          const sampleContact = contacts[0];
          attachmentPlaceholder
            .save(`Contacts/${sampleContact.ContactID}`, dataReadStream, true)
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on an account using a file stream', done => {
      const attachmentTemplate = {
        FileName: '2-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
      const dataReadStream = fs.createReadStream(sampleDataReference);
      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.accounts
        .getAccounts()
        .then(accounts => {
          const sampleAccount = accounts[0];
          attachmentPlaceholder
            .save(`Accounts/${sampleAccount.AccountID}`, dataReadStream, true)
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on a manual journal using a file reference', done => {
      const attachmentTemplate = {
        FileName: '1-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
      const dataReadStream = fs.createReadStream(sampleDataReference);

      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.manualjournals
        .getManualJournals()
        .then(manualJournals => {
          const sampleManualJournal = manualJournals[0];
          attachmentPlaceholder
            .save(
              `ManualJournals/${sampleManualJournal.ManualJournalID}`,
              dataReadStream,
              true
            )
            .then(response => {
              expect(response.entities.length).to.equal(1);
              const thisFile = response.entities[0];
              expect(thisFile.AttachmentID).to.not.equal('');
              expect(thisFile.AttachmentID).to.not.equal(undefined);
              expect(thisFile.FileName).to.equal(attachmentTemplate.FileName);
              expect(thisFile.MimeType).to.equal(attachmentTemplate.MimeType);
              expect(thisFile.ContentLength).to.be.greaterThan(0);
              expect(thisFile.Url).to.not.equal('');
              expect(thisFile.Url).to.not.equal(undefined);
              done();
            })
            .catch(err => {
              console.error(util.inspect(err, null, null));
              done(wrapError(err));
            });
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });

    it('creates an attachment on an account using text as a stream - should fail', done => {
      const attachmentTemplate = {
        FileName: '2-test-attachment.pdf',
        MimeType: 'application/pdf',
      };

      const sampleDataReference = `${__dirname}/testdata/test-attachment.pdf`;
      const attachmentPlaceholder = currentApp.core.attachments.newAttachment(
        attachmentTemplate
      );

      // Add attachment to an Invoice
      currentApp.core.accounts
        .getAccounts()
        .then(accounts => {
          const sampleAccount = accounts[0];
          attachmentPlaceholder
            .save(
              `Accounts/${sampleAccount.AccountID}`,
              sampleDataReference,
              true
            )
            .then(() => {
              done(new Error('Expected method to reject.'));
            })
            .catch(err => {
              expect(err).to.not.equal(undefined);
              done();
            })
            .catch(done);
        })
        .catch(err => {
          console.error(util.inspect(err, null, null));
          done(wrapError(err));
        });
    });
  });
});
