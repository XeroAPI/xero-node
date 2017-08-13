'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const createAccount = functions.createAccount;
const util = common.util;

const currentApp = common.currentApp;

const bankAccounts = [];

describe('reporting tests', () => {
  before('create a bank account for testing', () =>
    createAccount({
      Type: 'BANK',
      BankAccountNumber: '062-021-0000000',
    }).then(response => {
      const thisAccount = response.entities[0];
      bankAccounts.push({
        account: thisAccount,
        id: thisAccount.AccountID,
      });
    })
  );

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

  const validateRows = rows => {
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
        const someContactId = contacts[0].ContactID;

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
        const someContactId = contacts[0].ContactID;

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
