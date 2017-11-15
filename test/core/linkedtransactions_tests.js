'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const createAccount = functions.createAccount;
const util = common.util;

const currentApp = common.currentApp;

const validateLinkedTransaction = linkedTransaction => {
  if (!linkedTransaction) return false;

  expect(linkedTransaction.LinkedTransactionID).to.be.a('String');
  expect(linkedTransaction.SourceTransactionID).to.be.a('String');
  expect(linkedTransaction.SourceLineItemID).to.be.a('String');
  expect(linkedTransaction.ContactID).to.be.a('String');
  expect(linkedTransaction.Status).to.be.a('String');
  expect(linkedTransaction.Type).to.be.a('String');
  expect(linkedTransaction.UpdatedDateUTC).to.be.a('Date');
  expect(linkedTransaction.SourceTransactionTypeCode).to.be.a('String');

  return true;
};

describe('Linked Transactions', () => {
  let expenseAccountCode;
  let expenseAccountID;
  let expenseInvoiceID;
  let expenseContactID;
  let expenseLineItemID;

  let linkedTransactionID;

  let salesAccountCode;
  let salesAccountID;
  let salesInvoiceID;
  let salesLineItemID;

  // Linked Transactions require an Invoice, Line Item and Contact
  before('create an expense account for testing', () =>
    createAccount({ Type: 'EXPENSE' }).then(response => {
      expenseAccountID = response.entities[0].AccountID;
      expenseAccountCode = response.entities[0].Code;
    })
  );

  before('create a sales account for testing', () =>
    createAccount({ Type: 'SALES' }).then(response => {
      salesAccountID = response.entities[0].AccountID;
      salesAccountCode = response.entities[0].Code;
    })
  );

  before('create an ACCPAY invoice', done => {
    const invoice = currentApp.core.invoices.newInvoice({
      Type: 'ACCPAY',
      Status: 'AUTHORISED',
      Contact: {
        Name: 'Department of Testing',
      },
      DueDate: new Date().toISOString().split('T')[0],
      LineItems: [
        {
          Description: 'Services',
          Quantity: 1,
          UnitAmount: 230,
          AccountCode: expenseAccountCode,
          Tracking: [
            {
              Name: 'Region',
              Option: 'North',
            },
          ],
        },
      ],
    });
    invoice
      .save({ unitdp: 4 })
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        // store the first invoice id for later use.
        expenseInvoiceID = response.entities[0].InvoiceID;
        expenseContactID = response.entities[0].Contact.ContactID;
        expenseLineItemID = response.entities[0].LineItems[0].LineItemID;
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  before('create an ACCREC invoice', done => {
    const invoice = currentApp.core.invoices.newInvoice({
      Type: 'ACCREC',
      Status: 'AUTHORISED',
      Contact: {
        ContactID: expenseContactID,
      },
      DueDate: new Date().toISOString().split('T')[0],
      LineItems: [
        {
          Description: 'Services',
          Quantity: 1,
          UnitAmount: 500,
          AccountCode: salesAccountCode,
          Tracking: [
            {
              Name: 'Region',
              Option: 'North',
            },
          ],
        },
      ],
    });
    invoice
      .save({ unitdp: 4 })
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        // store the first invoice id for later use.
        salesInvoiceID = response.entities[0].InvoiceID;
        salesLineItemID = response.entities[0].LineItems[0].LineItemID;
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  after('archive the expense account for testing', () => {
    currentApp.core.accounts.getAccount(expenseAccountID).then(response => {
      const account = response;
      account.Status = 'ARCHIVED';
      return account.save();
    });
  });

  after('archive the sales account for testing', () => {
    currentApp.core.accounts.getAccount(salesAccountID).then(response => {
      const account = response;
      account.Status = 'ARCHIVED';
      return account.save();
    });
  });

  it('creates a linked transaction', done => {
    const sampleTransaction = {
      SourceTransactionID: expenseInvoiceID,
      SourceLineItemID: expenseLineItemID,
      ContactID: expenseContactID,
    };

    const linkedTransaction = currentApp.core.linkedTransactions.newLinkedTransaction(
      sampleTransaction
    );

    linkedTransaction
      .save()
      .then(linkedTransactions => {
        expect(linkedTransactions.entities.length).to.be.greaterThan(0);
        linkedTransactionID =
          linkedTransactions.entities[0].LinkedTransactionID;
        done();
      })
      .catch(err => {
        console.warn(err);
        done(wrapError(err));
      });
  });

  it('get all linked transactions', done => {
    currentApp.core.linkedTransactions
      .getLinkedTransactions()
      .then(linkedTransactions => {
        expect(linkedTransactions).to.have.length.greaterThan(0);
        linkedTransactions.forEach(linkedTransaction => {
          expect(validateLinkedTransaction(linkedTransaction)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.warn(err);
        done(wrapError(err));
      });
  });

  it('get a single linked transaction', done => {
    currentApp.core.linkedTransactions
      .getLinkedTransaction(linkedTransactionID)
      .then(linkedTransaction => {
        expect(validateLinkedTransaction(linkedTransaction)).to.equal(true);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(wrapError(err));
      });
  });

  it('updates a linked transaction to add target data', done => {
    currentApp.core.linkedTransactions
      .getLinkedTransaction(linkedTransactionID)
      .then(response => {
        const linkedTransaction = response;

        expect(validateLinkedTransaction(linkedTransaction)).to.equal(true);

        linkedTransaction.TargetTransactionID = salesInvoiceID;
        linkedTransaction.TargetLineItemID = salesLineItemID;

        return linkedTransaction.save();
      })
      .then(linkedTransactions => {
        expect(linkedTransactions.entities.length).to.be.greaterThan(0);
        expect(linkedTransactions.entities[0].TargetTransactionID).to.equal(
          salesInvoiceID
        );
        expect(linkedTransactions.entities[0].TargetLineItemID).to.equal(
          salesLineItemID
        );
        expect(linkedTransactions.entities[0].Status).to.equal('BILLED');
        done();
      })
      .catch(err => {
        console.warn(err);
        done(wrapError(err));
      });
  });

  it('deletes a linked transaction', done => {
    currentApp.core.linkedTransactions
      .deleteLinkedTransaction(linkedTransactionID)
      .then(() => {
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
