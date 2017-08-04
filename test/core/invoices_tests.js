'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;
const util = common.util;
const uuid = common.uuid;

const currentApp = common.currentApp;

const validateInvoice = invoice => {
  if (!invoice) {
    return false;
  }

  expect(invoice.InvoiceID).to.not.equal('');
  expect(invoice.InvoiceID).to.not.equal(undefined);

  invoice.LineItems.forEach(lineItem => {
    expect(lineItem.UnitAmount).to.match(/[0-9]+\.?[0-9]{0,4}/);
  });

  expect(invoice.DueDate).to.be.a('date');

  return true;
};

describe('invoices', () => {
  let InvoiceID = '';
  let salesAccountID = '';
  let salesAccountCode = '';

  before('create a sales account for testing', () => {
    const randomString = uuid.v4();

    const testAccountData = {
      Code: randomString.replace(/-/g, '').substring(0, 10),
      Name: `Test sales from Node SDK ${randomString}`,
      Type: 'REVENUE',
      Status: 'ACTIVE',
      TaxType: 'OUTPUT',
    };

    const account = currentApp.core.accounts.newAccount(testAccountData);

    return account.save().then(response => {
      salesAccountID = response.entities[0].AccountID;
      salesAccountCode = response.entities[0].Code;
    });
  });

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
        });

        done();
      })
      .catch(err => {
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
});
