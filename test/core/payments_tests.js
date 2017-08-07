'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const createAccount = functions.createAccount;
const util = common.util;

const currentApp = common.currentApp;

describe('payments', () => {
  /* Please note that this test pays an invoice created in the previous tests */

  let invoiceID;
  let amountDue;
  let paymentId;
  let testAccountCode;
  let testAccount;

  before('create an account to pay into', () =>
    createAccount({
      Type: 'SALES',
      EnablePaymentsToAccount: true,
    }).then(response => {
      testAccountCode = response.entities[0].Code;
      testAccount = response.entities[0];
    })
  );

  before('get an unpaid invoice to pay', () => {
    const filter = 'Status == "AUTHORISED"';
    return currentApp.core.invoices
      .getInvoices({ where: filter })
      .then(invoices => {
        invoiceID = invoices[0].InvoiceID;
        amountDue = invoices[0].AmountDue;
      });
  });

  after('archive the test account', () => {
    testAccount.Status = 'ARCHIVED';
    return testAccount.save();
  });

  it('Create Payment', done => {
    const payment = currentApp.core.payments.newPayment({
      Invoice: {
        InvoiceID: invoiceID,
      },
      Account: {
        Code: testAccountCode,
      },
      Date: new Date().toISOString().split('T')[0],
      Amount: amountDue,
    });

    payment
      .save()
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);

        paymentId = response.entities[0].PaymentID;
        expect(paymentId).to.not.equal('');
        expect(paymentId).to.not.equal(undefined);
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
      .getPayment(paymentId)
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
      PaymentID: paymentId,
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

  it('Delete Payment', done => {
    // NOT CURRENTLY SUPPORTED IN THE API.
    // Use update Payment with Payment.Status = DELETED.
    done();
  });
});
