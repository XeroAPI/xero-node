'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const util = common.util;
const wrapError = functions.wrapError;
const createAccount = functions.createAccount;

const validatePrepayment = prepayment => {
  if (!prepayment) return false;

  expect(prepayment.PrepaymentID).to.be.a('String');
  expect(prepayment.Type).to.be.a('String');
  expect(prepayment.Type).to.be.a('String');

  if (prepayment.Reference) {
    expect(prepayment.Reference).to.be.a('String');
  }

  expect(prepayment.RemainingCredit).to.be.a('Number');

  if (prepayment.Allocations) {
    prepayment.Allocations.forEach(allocation => {
      expect(allocation.Amount).to.be.a('Number');
      expect(allocation.Date).to.be.a('Date');
      expect(allocation.Invoice.InvoiceID).to.be.a('String');
      expect(allocation.Invoice.InvoiceNumber).to.be.a('String');
      expect(allocation.Invoice.InvoiceNumber).to.be.a('String');
    });
  }

  if (prepayment.Payments) {
    prepayment.Payments.forEach(payment => {
      expect(payment.Amount).to.be.a('Number');
    });
  }

  expect(prepayment.HasAttachments).to.be.a('Boolean');
  expect(prepayment.Date).to.be.a('Date');
  expect(prepayment.Status).to.be.a('String');
  expect(prepayment.LineAmountTypes).to.be.a('String');

  if (prepayment.LineItems) {
    prepayment.LineItems.forEach(lineItem => {
      expect(lineItem.UnitAmount).to.be.a('Number');
    });
  }

  expect(prepayment.SubTotal).to.be.a('Number');
  expect(prepayment.TotalTax).to.be.a('Number');
  expect(prepayment.Total).to.be.a('Number');

  if (prepayment.UpdatedDate) {
    expect(prepayment.UpdatedDate).to.be.a('Date');
  }

  expect(prepayment.CurrencyCode).to.be.a('String');

  return true;
};

describe('Prepayments', () => {
  let spendPrepaymentID;
  let receivePrepaymentID;
  let receiveInvoiceID;
  let bankAccountId;
  let salesAccountCode;
  let salesAccountID;
  const myAllocationAmount = 250;

  before('create a bank account for testing', () =>
    createAccount({
      Type: 'BANK',
      BankAccountNumber: '062-021-0000000',
    }).then(response => {
      bankAccountId = response.entities[0].AccountID;
    })
  );

  before('create a sales account for testing', () =>
    createAccount({ Type: 'REVENUE' }).then(response => {
      salesAccountID = response.entities[0].AccountID;
      salesAccountCode = response.entities[0].Code;
    })
  );

  after('archive the account for testing', () => {
    common.currentApp.core.accounts
      .getAccount(salesAccountID)
      .then(response => {
        const account = response;
        account.Status = 'ARCHIVED';
        return account.save();
      });
  });

  before('get an invoice for allocation', done => {
    const filter = `Type == "ACCREC" && Status = "AUTHORISED" && AmountDue >= ${myAllocationAmount}`;

    common.currentApp.core.invoices
      .getInvoices({ where: filter })
      .then(invoices => {
        expect(invoices.length).to.be.greaterThan(0);
        receiveInvoiceID = invoices[0].InvoiceID;
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  before('creates a new receive prepayment transaction', done => {
    const transaction = common.currentApp.core.bankTransactions.newBankTransaction(
      {
        Type: 'RECEIVE-PREPAYMENT',
        Contact: {
          Name: 'Johnny McGibbons',
        },
        LineAmountTypes: 'Inclusive',
        LineItems: [
          {
            Description: 'Prepayment for services',
            UnitAmount: myAllocationAmount,
            AccountCode: salesAccountCode,
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
      }
    );

    transaction
      .save()
      .then(response => {
        receivePrepaymentID = response.entities[0].PrepaymentID;
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  before('creates a new spend prepayment transaction', done => {
    const transaction = common.currentApp.core.bankTransactions.newBankTransaction(
      {
        Type: 'SPEND-PREPAYMENT',
        Contact: {
          Name: 'Johnny McGibbons',
        },
        LineAmountTypes: 'Inclusive',
        LineItems: [
          {
            Description: 'Forgot to cancel annual sub payment',
            UnitAmount: myAllocationAmount,
            AccountCode: salesAccountCode,
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
      }
    );

    transaction
      .save()
      .then(response => {
        spendPrepaymentID = response.entities[0].PrepaymentID;
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get all', done => {
    common.currentApp.core.prepayments
      .getPrepayments()
      .then(prepayments => {
        prepayments.forEach(prepayment => {
          expect(validatePrepayment(prepayment)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get one', done => {
    common.currentApp.core.prepayments
      .getPrepayment(receivePrepaymentID)
      .then(prepayment => {
        expect(validatePrepayment(prepayment)).to.equal(true);
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('allocate prepayment to invoice', done => {
    common.currentApp.core.prepayments
      .getPrepayment(receivePrepaymentID)
      .then(prepayment => {
        expect(validatePrepayment(prepayment)).to.equal(true);

        // Now apply the allocation to the original invoice.
        const allocations = [
          {
            Amount: myAllocationAmount,
            Invoice: {
              InvoiceID: receiveInvoiceID,
            },
          },
        ];

        return prepayment.saveAllocations(allocations);
      })
      .then(allocations => {
        expect(allocations.entities.length).to.be.greaterThan(0);
        expect(allocations.entities[0].Amount).to.equal(myAllocationAmount);
        expect(allocations.entities[0].Prepayment.PrepaymentID).to.equal(
          receivePrepaymentID
        );
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('refund prepayment with payment', done => {
    const samplePayment = {
      Prepayment: {
        PrepaymentID: spendPrepaymentID,
      },
      Account: {
        AccountID: bankAccountId,
      },
      Date: new Date().toISOString().split('T')[0],
      Amount: myAllocationAmount,
    };

    const payment = common.currentApp.core.payments.newPayment(samplePayment);

    payment
      .save()
      .then(payments => {
        expect(payments.entities.length).to.be.greaterThan(0);
        expect(payments.entities[0].Prepayment.Total).to.equal(
          samplePayment.Amount
        );
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });
});
