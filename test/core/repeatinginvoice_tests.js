'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const util = common.util;

const currentApp = common.currentApp;

const validateRepeatingInvoice = repeatingInvoice => {
  if (!repeatingInvoice) {
    return false;
  }

  expect(repeatingInvoice.RepeatingInvoiceID).to.not.equal('');
  expect(repeatingInvoice.RepeatingInvoiceID).to.not.equal(undefined);

  // Validate LineItems
  repeatingInvoice.LineItems.forEach(lineItem => {
    expect(lineItem.Description).to.be.a('String');
    expect(lineItem.UnitAmount).to.be.a('Number');
    expect(lineItem.UnitAmount).to.match(/[0-9]+\.?[0-9]{0,4}/);
    expect(lineItem.TaxType).to.be.a('String');
    expect(lineItem.TaxAmount).to.be.a('Number');
    expect(lineItem.TaxAmount).to.match(/[0-9]+\.?[0-9]{0,4}/);
    expect(lineItem.LineAmount).to.be.a('Number');
    expect(lineItem.LineAmount).to.match(/[0-9]+\.?[0-9]{0,4}/);
    expect(lineItem.AccountCode).to.be.a('String');
    expect(lineItem.Tracking).to.be.an('Array');

    lineItem.Tracking.forEach(trackingCategory => {
      expect(trackingCategory.Name).to.be.a('String');
      expect(trackingCategory.Option).to.be.a('String');
      expect(trackingCategory.TrackingCategoryID).to.be.a('String');
      expect(trackingCategory.Options).to.be.an('Array');
    });

    expect(lineItem.Quantity).to.be.a('Number');
    expect(lineItem.LineItemID).to.be.a('String');
  });

  // Validate Subtotal
  expect(repeatingInvoice.SubTotal).to.be.a('Number');
  expect(repeatingInvoice.SubTotal).to.match(/[0-9]+\.?[0-9]{0,4}/);

  // Validate TotalTax
  expect(repeatingInvoice.TotalTax).to.be.a('Number');
  expect(repeatingInvoice.TotalTax).to.match(/[0-9]+\.?[0-9]{0,4}/);

  // Validate Total
  expect(repeatingInvoice.Total).to.be.a('Number');
  expect(repeatingInvoice.Total).to.match(/[0-9]+\.?[0-9]{0,4}/);

  // Validate CurrencyCode
  expect(repeatingInvoice.CurrencyCode).to.be.a('String');

  // Type
  expect(repeatingInvoice.Type).to.be.a('String');
  expect(repeatingInvoice.Type).to.not.equal('');
  expect(repeatingInvoice.Type).to.not.equal(undefined);

  // Reference
  expect(repeatingInvoice.Reference).to.be.a('String');

  // HasAttachments
  expect(repeatingInvoice.HasAttachments).to.be.a('Boolean');

  // ID
  expect(repeatingInvoice.ID).to.be.a('String');

  // Status
  expect(repeatingInvoice.Status).to.be.a('String');

  // LineAmountTypes
  expect(repeatingInvoice.LineAmountTypes).to.be.a('String');

  // Validate Contact
  if (repeatingInvoice.Contact) {
    expect(repeatingInvoice.Contact.ContactID).to.not.equal('');
    expect(repeatingInvoice.Contact.ContactID).to.not.equal(undefined);
    expect(repeatingInvoice.Contact.Name).to.not.equal('');
    expect(repeatingInvoice.Contact.Name).to.not.equal(undefined);
  }

  // Validate Schedule
  if (repeatingInvoice.Schedule) {
    expect(repeatingInvoice.Schedule.Period).to.be.a('Number');
    expect(repeatingInvoice.Schedule.Unit).to.be.a('String');
    expect(repeatingInvoice.Schedule.DueDate).to.be.a('Number');
    expect(repeatingInvoice.Schedule.DueDateType).to.be.a('String');
    expect(repeatingInvoice.Schedule.StartDate).to.be.a('Date');
    expect(repeatingInvoice.Schedule.NextScheduledDate).to.be.a('Date');
  }

  return true;
};

describe('repeating invoices', () => {
  let repeatingInvoiceID = '';

  it('get', done => {
    currentApp.core.repeatinginvoices
      .getRepeatingInvoices()
      .then(repeatingInvoices => {
        expect(repeatingInvoices).to.have.length.greaterThan(0);
        repeatingInvoices.forEach(repeatingInvoice => {
          expect(validateRepeatingInvoice(repeatingInvoice)).to.equal(true);

          repeatingInvoiceID = repeatingInvoice.RepeatingInvoiceID;
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get by ID', done => {
    currentApp.core.repeatinginvoices
      .getRepeatingInvoice(repeatingInvoiceID)
      .then(repeatingInvoice => {
        expect(validateRepeatingInvoice(repeatingInvoice)).to.equal(true);

        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get by filter', done => {
    const currencyCode = 'AUD';
    const filter = `CurrencyCode == "${currencyCode}"`;
    currentApp.core.repeatinginvoices
      .getRepeatingInvoices({
        where: filter,
      })
      .then(repeatingInvoices => {
        expect(repeatingInvoices).to.have.length.greaterThan(0);
        repeatingInvoices.forEach(repeatingInvoice => {
          expect(validateRepeatingInvoice(repeatingInvoice)).to.equal(true);
          expect(repeatingInvoice.CurrencyCode).to.equal(currencyCode);
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get attachments for repeatinginvoices', done => {
    const filter = 'HasAttachments == true';
    currentApp.core.repeatinginvoices
      .getRepeatingInvoices({ where: filter })
      .then(repeatinginvoices => {
        if (repeatinginvoices.length === 0) done();
        let objectsProcessed = 0;
        repeatinginvoices.forEach(repeatinginvoice => {
          repeatinginvoice
            .getAttachments()
            .then(attachments => {
              objectsProcessed += 1;
              attachments.forEach((attachment, index) => {
                expect(attachment.AttachmentID).to.not.equal('');
                expect(attachment.AttachmentID).to.not.equal(undefined);

                if (
                  objectsProcessed === repeatinginvoices.length &&
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
