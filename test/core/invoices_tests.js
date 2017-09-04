'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const createAccount = functions.createAccount;
const util = common.util;

const currentApp = common.currentApp;

const validateInvoice = invoice => {
  if (!invoice) {
    return false;
  }

  expect(invoice.Type).to.be.a('String');
  expect(invoice.Date).to.be.a('Date');
  expect(invoice.DueDate).to.be.a('Date');
  expect(invoice.LineAmountTypes).to.be.a('String');
  expect(invoice.InvoiceNumber).to.be.a('String');

  if (invoice.Reference) {
    expect(invoice.Reference).to.be.a('String');
  }

  if (invoice.BrandingThemeID) {
    expect(invoice.BrandingThemeID).to.be.a('String');
  }

  if (invoice.Url) {
    expect(invoice.Url).to.be.a('String');
  }

  expect(invoice.CurrencyCode).to.be.a('String');

  if (invoice.CurrencyRate) {
    expect(invoice.CurrencyRate).to.be.a('Number');
  }

  expect(invoice.Status).to.be.a('String');

  if (invoice.SentToContact) {
    expect(invoice.SentToContact).to.be.a('Boolean');
  }

  if (invoice.ExpectedPaymentDate) {
    expect(invoice.ExpectedPaymentDate).to.be.a('String');
  }

  if (invoice.PlannedPaymentDate) {
    expect(invoice.PlannedPaymentDate).to.be.a('String');
  }

  expect(invoice.SubTotal).to.be.a('Number');
  expect(invoice.TotalTax).to.be.a('Number');
  expect(invoice.Total).to.be.a('Number');

  if (invoice.TotalDiscount) {
    expect(invoice.TotalDiscount).to.be.a('String');
  }

  expect(invoice.InvoiceID).to.be.a('String');

  if (invoice.HasAttachments) {
    expect(invoice.HasAttachments).to.be.a('Boolean');
  }

  expect(invoice.AmountDue).to.be.a('Number');
  expect(invoice.AmountPaid).to.be.a('Number');

  if (invoice.FullyPaidOnDate) {
    expect(invoice.FullyPaidOnDate).to.be.a('Date');
  }

  if (invoice.AmountCredited) {
    expect(invoice.AmountCredited).to.be.a('Number');
  }

  expect(invoice.UpdatedDateUTC).to.be.a('Date');

  // Arrays
  invoice.Payments.forEach(payment => {
    expect(payment.PaymentID).to.be.a('String');
  });

  invoice.LineItems.forEach(lineItem => {
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

  invoice.CreditNotes.forEach(creditNote => {
    expect(creditNote.CreditNoteID).to.be.a('String');
  });

  return true;
};

describe('invoices', () => {
  let InvoiceID = '';
  let salesAccountID = '';
  let salesAccountCode = '';
  const invoiceIDsList = [];
  const invoiceNumbersList = [];
  const contactIDsList = [];

  before('create a sales account for testing', () =>
    createAccount({ Type: 'REVENUE' }).then(response => {
      salesAccountID = response.entities[0].AccountID;
      salesAccountCode = response.entities[0].Code;
    })
  );

  after('archive the account for testing', () => {
    currentApp.core.accounts.getAccount(salesAccountID).then(response => {
      const account = response;
      account.Status = 'ARCHIVED';
      return account.save();
    });
  });

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
        InvoiceID = response.entities[0].InvoiceID;

        expect(validateInvoice(response.entities[0])).to.equal(true);

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
          expect(validateInvoice(invoice)).to.equal(true);

          if (invoiceIDsList.length < 5) {
            invoiceIDsList.push(invoice.InvoiceID);
          }

          if (invoiceNumbersList.length < 5) {
            invoiceNumbersList.push(invoice.InvoiceNumber);
          }

          if (contactIDsList.length < 5) {
            contactIDsList.push(invoice.Contact.ContactID);
          }
        });

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('get all (paging)', done => {
    const onInvoices = (err, response, cb) => {
      cb();
      try {
        response.data.forEach(invoice => {
          expect(validateInvoice(invoice)).to.equal(true);
        });

        if (response.finished) done();
      } catch (ex) {
        console.error(util.inspect(err, null, null));
        done(ex);
      }
    };

    currentApp.core.invoices
      .getInvoices({ pager: { start: 1, callback: onInvoices } })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get invoice', done => {
    currentApp.core.invoices
      .getInvoice(InvoiceID)
      .then(invoice => {
        expect(invoice.InvoiceID).to.equal(InvoiceID);
        expect(validateInvoice(invoice)).to.equal(true);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get invoices by invoiceIDs', done => {
    currentApp.core.invoices
      .getInvoices({
        params: {
          IDs: invoiceIDsList.toString(),
        },
      })
      .then(invoices => {
        invoices.forEach(invoice => {
          expect(invoice.InvoiceID).to.be.oneOf(invoiceIDsList);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get invoices by invoice numbers', done => {
    currentApp.core.invoices
      .getInvoices({
        params: {
          InvoiceNumbers: invoiceNumbersList.toString(),
        },
      })
      .then(invoices => {
        invoices.forEach(invoice => {
          expect(invoice.InvoiceNumber).to.be.oneOf(invoiceNumbersList);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get invoices by contact ids', done => {
    currentApp.core.invoices
      .getInvoices({
        params: {
          ContactIDs: contactIDsList.toString(),
        },
      })
      .then(invoices => {
        invoices.forEach(invoice => {
          expect(invoice.Contact.ContactID).to.be.oneOf(contactIDsList);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get invoices by statuses', done => {
    currentApp.core.invoices
      .getInvoices({
        params: {
          Statuses: 'PAID,VOIDED',
        },
      })
      .then(invoices => {
        invoices.forEach(invoice => {
          expect(invoice.Status).to.be.oneOf(['PAID', 'VOIDED']);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get invoice with filter', done => {
    const filter = 'Status != "AUTHORISED"';
    currentApp.core.invoices
      .getInvoices({ where: filter })
      .then(invoices => {
        expect(invoices.length).to.be.at.least(0);
        invoices.forEach(invoice => {
          expect(validateInvoice(invoice)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
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
          AccountCode: salesAccountCode,
        });
        invoice.Status = 'AUTHORISED';
        return invoice.save();
      })
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);

        response.entities.forEach(invoice => {
          expect(validateInvoice(invoice)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
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
              AccountCode: salesAccountCode,
            },
          ],
        })
      );
    }

    currentApp.core.invoices
      .saveInvoices(invoices)
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(9);
        response.entities.forEach(invoice => {
          expect(validateInvoice(invoice)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('get attachments for invoices', done => {
    const filter = 'HasAttachments == true';
    currentApp.core.invoices
      .getInvoices({ where: filter })
      .then(invoices => {
        if (invoices.length === 0) done();
        let objectsProcessed = 0;
        invoices.forEach(invoice => {
          invoice
            .getAttachments()
            .then(attachments => {
              objectsProcessed += 1;
              attachments.forEach((attachment, index) => {
                expect(attachment.AttachmentID).to.not.equal('');
                expect(attachment.AttachmentID).to.not.equal(undefined);

                if (
                  objectsProcessed === invoices.length &&
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
