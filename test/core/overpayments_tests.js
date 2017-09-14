'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const util = common.util;
const wrapError = functions.wrapError;
const createAccount = functions.createAccount;

const validateOverpayment = overpayment => {
  if (!overpayment) return false;

  expect(overpayment.OverpaymentID).to.be.a('String');

  // Contact
  expect(overpayment.Contact.ContactID).to.be.a('String');
  expect(overpayment.Contact.Name).to.be.a('String');

  expect(overpayment.Date).to.be.a('Date');
  expect(overpayment.Status).to.be.a('String');
  expect(overpayment.LineAmountTypes).to.be.a('String');
  expect(overpayment.SubTotal).to.be.a('Number');
  expect(overpayment.TotalTax).to.be.a('Number');
  expect(overpayment.Total).to.be.a('Number');
  expect(overpayment.CurrencyCode).to.be.a('String');
  expect(overpayment.Type).to.be.a('String');

  if (overpayment.CurrencyRate) {
    expect(overpayment.CurrencyRate).to.be.a('Number');
  }

  expect(overpayment.RemainingCredit).to.be.a('Number');

  if (overpayment.Allocations) {
    overpayment.Allocations.forEach(allocation => {
      expect(allocation.Amount).to.be.a('Number');
      expect(allocation.Date).to.be.a('Date');
      expect(allocation.Invoice.InvoiceID).to.be.a('String');
      expect(allocation.Invoice.InvoiceNumber).to.be.a('String');
      expect(allocation.Invoice.InvoiceNumber).to.be.a('String');
    });
  }

  expect(overpayment.HasAttachments).to.be.a('Boolean');

  return true;
};

describe('Overpayments', () => {
  let spendOverpaymentID;
  let receiveOverpaymentID;
  let receiveInvoiceID;
  let bankAccountId;
  const myAllocationAmount = 250;

  before('create a bank account for testing', () =>
    createAccount({
      Type: 'BANK',
      BankAccountNumber: '062-021-0000000',
    }).then(response => {
      bankAccountId = response.entities[0].AccountID;
    })
  );

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

  before('creates a new receive overpayment transaction', done => {
    const transaction = common.currentApp.core.bankTransactions.newBankTransaction(
      {
        Type: 'RECEIVE-OVERPAYMENT',
        Contact: {
          Name: 'Johnny McGibbons',
        },
        LineAmountTypes: 'NoTax',
        LineItems: [
          {
            Description: 'Overpayment for services',
            UnitAmount: myAllocationAmount,
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
        receiveOverpaymentID = response.entities[0].OverpaymentID;
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  before('creates a new spend overpayment transaction', done => {
    const transaction = common.currentApp.core.bankTransactions.newBankTransaction(
      {
        Type: 'SPEND-OVERPAYMENT',
        Contact: {
          Name: 'Johnny McGibbons',
        },
        LineAmountTypes: 'NoTax',
        LineItems: [
          {
            Description: 'Forgot to cancel annual sub payment',
            UnitAmount: myAllocationAmount,
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
        spendOverpaymentID = response.entities[0].OverpaymentID;
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get all', done => {
    common.currentApp.core.overpayments
      .getOverpayments()
      .then(overpayments => {
        overpayments.forEach(overpayment => {
          expect(validateOverpayment(overpayment)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get one', done => {
    common.currentApp.core.overpayments
      .getOverpayment(receiveOverpaymentID)
      .then(overpayment => {
        expect(validateOverpayment(overpayment)).to.equal(true);
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('allocate overpayment to invoice', done => {
    common.currentApp.core.overpayments
      .getOverpayment(receiveOverpaymentID)
      .then(overpayment => {
        expect(validateOverpayment(overpayment)).to.equal(true);

        // Now apply the allocation to the original invoice.
        const allocations = [
          {
            Amount: myAllocationAmount,
            Invoice: {
              InvoiceID: receiveInvoiceID,
            },
          },
        ];

        return overpayment.saveAllocations(allocations);
      })
      .then(allocations => {
        expect(allocations.entities.length).to.be.greaterThan(0);
        expect(allocations.entities[0].Amount).to.equal(myAllocationAmount);
        expect(allocations.entities[0].Overpayment.OverpaymentID).to.equal(
          receiveOverpaymentID
        );
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('refund overpayment with payment', done => {
    const samplePayment = {
      Overpayment: {
        OverpaymentID: spendOverpaymentID,
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
        expect(payments.entities[0].Overpayment.Total).to.equal(
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
