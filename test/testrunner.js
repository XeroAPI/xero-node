'use strict';

process.on('uncaughtException', err => {
  console.error('uncaught', err);
});

function importTest(name, path) {
  describe(name, () => {
    // eslint-disable-next-line
    require(path);
  });
}

describe('Authorisation Tests', () => {
  importTest('token_tests', `${__dirname}/core/token_tests.js`);
});

describe('Accounting API Tests', () => {
  beforeEach(done => {
    setTimeout(() => {
      done();
    }, 400);
  });

  // Accounting (Core) API Tests
  importTest('organisation_tests', `${__dirname}/core/organisation_tests.js`);
  importTest('accounts_tests', `${__dirname}/core/accounts_tests.js`);
  importTest('creditnotes_tests', `${__dirname}/core/creditnotes_tests.js`);
  importTest('currencies_tests', `${__dirname}/core/currencies_tests.js`);
  importTest('report_tests', `${__dirname}/core/report_tests.js`);
  importTest(
    'invoicereminder_tests',
    `${__dirname}/core/invoicereminder_tests.js`
  );
  importTest('brandingtheme_tests', `${__dirname}/core/brandingtheme_tests.js`);
  importTest('taxrate_tests', `${__dirname}/core/taxrate_tests.js`);
  importTest('invoices_tests', `${__dirname}/core/invoices_tests.js`);
  importTest('payments_tests', `${__dirname}/core/payments_tests.js`);
  importTest(
    'banktransactions_tests',
    `${__dirname}/core/banktransactions_tests.js`
  );
  importTest('banktransfers_tests', `${__dirname}/core/banktransfers_tests.js`);
  importTest(
    'trackingcategories_tests',
    `${__dirname}/core/trackingcategories_tests.js`
  );
  importTest('items_tests', `${__dirname}/core/items_tests.js`);
  importTest('contacts_tests', `${__dirname}/core/contacts_tests.js`);
  importTest('journals_tests', `${__dirname}/core/journals_tests.js`);
  importTest(
    'manualjournals_tests',
    `${__dirname}/core/manualjournal_tests.js`
  );
  importTest('users_tests', `${__dirname}/core/users_tests.js`);
  importTest(
    'repeatinginvoice_tests',
    `${__dirname}/core/repeatinginvoice_tests.js`
  );
  importTest('contactgroups_tests', `${__dirname}/core/contactgroups_tests.js`);
  importTest('employees_tests', `${__dirname}/core/employees_tests.js`);
  importTest('receipts_tests', `${__dirname}/core/receipts_tests.js`);
  importTest('expenseclaims_tests', `${__dirname}/core/expenseclaims_tests.js`);
  importTest(
    'purchaseorders_tests',
    `${__dirname}/core/purchaseorders_tests.js`
  );
  importTest('attachment_tests', `${__dirname}/core/attachment_tests.js`);
  importTest('overpayments_tests', `${__dirname}/core/overpayments_tests.js`);
  importTest('prepayments_tests', `${__dirname}/core/prepayments_tests.js`);
  importTest(
    'linkedtransactions_tests',
    `${__dirname}/core/linkedtransactions_tests.js`
  );
  importTest('error_tests', `${__dirname}/core/error_tests.js`);
});

describe.skip('Payroll API Tests', () => {
  // //Payroll API Tests - not yet working
  importTest(
    'earningsrates_tests',
    `${__dirname}/payroll/earningsrates_tests.js`
  );
  importTest(
    'deductiontypes_tests',
    `${__dirname}/payroll/deductiontypes_tests.js`
  );
  importTest(
    'reimbursementtypes_tests',
    `${__dirname}/payroll/reimbursementtypes_tests.js`
  );
  importTest('leavetypes_tests', `${__dirname}/payroll/leavetypes_tests.js`);
  importTest('employees_tests', `${__dirname}/payroll/employees_tests.js`);
});
