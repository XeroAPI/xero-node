'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;
const util = common.util;
const uuid = common.uuid;

const currentApp = common.currentApp;

describe('invoices', function() {
  let InvoiceID = '';
  let salesAccountID = '';
  let salesAccountCode = '';

  before('create a sales account for testing', function() {
    const randomString = uuid.v4();

    const testAccountData = {
      Code: randomString.replace(/-/g, '').substring(0, 10),
      Name: `Test sales from Node SDK ${randomString}`,
      Type: 'REVENUE',
      Status: 'ACTIVE',
      TaxType: 'OUTPUT',
    };

    const account = currentApp.core.accounts.newAccount(testAccountData);

    return account.save().then(function(response) {
      salesAccountID = response.entities[0].AccountID;
      salesAccountCode = response.entities[0].Code;
    });
  });

  after('archive the account for testing', function() {
    currentApp.core.accounts
      .getAccount(salesAccountID)
      .then(function(response) {
        const account = response;
        account.Status = 'ARCHIVED';
        return account.save();
      });
  });

  it('create invoice', function(done) {
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
        },
      ],
    });
    invoice
      .save({ unitdp: 4 })
      .then(function(response) {
        expect(response.entities).to.have.length.greaterThan(0);

        let invoice = response.entities[0];
        InvoiceID = invoice.InvoiceID;

        expect(response.entities[0].InvoiceID).to.not.equal(undefined);
        expect(response.entities[0].InvoiceID).to.not.equal('');

        invoice.LineItems.forEach(function(lineItem) {
          expect(lineItem.UnitAmount).to.match(/[0-9]+\.?[0-9]{0,4}/);
        });

        const dueDate = new Date(invoice.DueDate);
        console.warn('Due Date: ', dueDate);

        expect(typeof dueDate.getDate).to.equal('function');

        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('get invoices', function(done) {
    currentApp.core.invoices
      .getInvoices()
      .then(function(invoices) {
        expect(invoices).to.have.length.greaterThan(0);

        invoices.forEach(function(invoice) {
          expect(invoice.InvoiceID).to.not.equal('');
          expect(invoice.InvoiceID).to.not.equal(undefined);
        });

        done();
      })
      .catch(function(err) {
        done(wrapError(err));
      });
  });
  it('get invoice', function(done) {
    currentApp.core.invoices
      .getInvoice(InvoiceID)
      .then(function(invoice) {
        expect(invoice.InvoiceID).to.equal(InvoiceID);
        done();
      })
      .catch(function(err) {
        console.log(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('get invoice with filter', function(done) {
    const filter = 'Status != "AUTHORISED"';
    currentApp.core.invoices
      .getInvoices({ where: filter })
      .then(function(invoices) {
        expect(invoices.length).to.be.at.least(0);
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
  it('update invoice', function(done) {
    currentApp.core.invoices
      .getInvoice(InvoiceID)
      .then(function(response) {
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
      .then(function(response) {
        expect(response.entities).to.have.length.greaterThan(0);

        response.entities.forEach(function(invoice) {
          expect(invoice.InvoiceID).to.not.equal('');
          expect(invoice.InvoiceID).to.not.equal(undefined);
        });
        done();
      })
      .catch(function(err) {
        console.log(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('saves multiple invoices', function(done) {
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
      .then(function(response) {
        expect(response.entities).to.have.length.greaterThan(9);
        done();
      })
      .catch(function(err) {
        done(wrapError(err));
      });
  });
});
