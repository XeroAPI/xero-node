'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;

describe('Invoice Reminders', () => {
  it('get', done => {
    common.currentApp.core.invoiceReminders
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
