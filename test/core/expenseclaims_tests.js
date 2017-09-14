'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const util = common.util;

const currentApp = common.currentApp;

const validateExpenseClaim = ExpenseClaim => {
  if (!ExpenseClaim) return false;

  expect(ExpenseClaim.ExpenseClaimID).to.be.a('String');

  return true;
};

const getReceipts = () => {
  const filter = 'Status == "DRAFT"';
  return currentApp.core.receipts.getReceipts({ where: filter });
};

describe('ExpenseClaims', () => {
  const sampleExpenseClaim = {
    Status: 'SUBMITTED',
    User: {},
    Receipts: [],
  };

  before('get a user', done => {
    currentApp.core.users
      .getUsers()
      .then(users => {
        sampleExpenseClaim.User.UserID = users[0].UserID;
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it('creates an ExpenseClaim', done => {
    getReceipts()
      .then(receipts => {
        let numberOfReceipts = receipts.length;

        if (numberOfReceipts > 5) {
          numberOfReceipts = 5;
        }

        for (let i = 0; i < numberOfReceipts; i += 1) {
          sampleExpenseClaim.Receipts.push({
            ReceiptID: receipts[i].ReceiptID,
          });
        }
      })
      .then(() => {
        const expenseClaim = common.currentApp.core.expenseClaims.newExpenseClaim(
          sampleExpenseClaim
        );

        return expenseClaim.save();
      })
      .then(response => {
        expect(validateExpenseClaim(response.entities[0])).to.equal(true);
        sampleExpenseClaim.ExpenseClaimID = response.entities[0].ExpenseClaimID;
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get one', done => {
    common.currentApp.core.expenseClaims
      .getExpenseClaim(sampleExpenseClaim.ExpenseClaimID)
      .then(expenseClaim => {
        expect(validateExpenseClaim(expenseClaim)).to.equal(true);
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get all', done => {
    currentApp.core.expenseClaims
      .getExpenseClaims()
      .then(expenseClaims => {
        expenseClaims.forEach(expenseClaim => {
          expect(validateExpenseClaim(expenseClaim)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('create multiple ExpenseClaims', done => {
    const expenseClaims = [];

    getReceipts()
      .then(receipts => {
        sampleExpenseClaim.Receipts.length = 0;
        let numberOfReceipts = receipts.length;

        if (numberOfReceipts > 3) {
          numberOfReceipts = 3;
        }

        for (let i = 0; i < numberOfReceipts; i += 1) {
          sampleExpenseClaim.Receipts.push({
            ReceiptID: receipts[i].ReceiptID,
          });
        }

        const newExpenseClaim = {};
        Object.assign(newExpenseClaim, sampleExpenseClaim);
        newExpenseClaim.ExpenseClaimID = undefined;

        expenseClaims.push(
          common.currentApp.core.expenseClaims.newExpenseClaim(newExpenseClaim)
        );
      })
      .then(() =>
        common.currentApp.core.expenseClaims.saveExpenseClaims(expenseClaims)
      )
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        response.entities.forEach(expenseClaim => {
          expect(validateExpenseClaim(expenseClaim)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('Updates an ExpenseClaim', done => {
    common.currentApp.core.expenseClaims
      .getExpenseClaim(sampleExpenseClaim.ExpenseClaimID)
      .then(expenseClaim => {
        expect(validateExpenseClaim(expenseClaim)).to.equal(true);
        expenseClaim.Status = 'AUTHORISED';
        return expenseClaim.save();
      })
      .then(response => {
        expect(validateExpenseClaim(response.entities[0])).to.equal(true);
        expect(response.entities[0].Status).to.equal('AUTHORISED');
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });
});
