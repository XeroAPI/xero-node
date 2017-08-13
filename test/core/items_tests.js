'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const createAccount = functions.createAccount;
const util = common.util;

const currentApp = common.currentApp;

describe('items', () => {
  let salesAccountID = '';
  let salesAccountCode = '';
  const sampleItem = {
    Code: `Item-${Math.random()}`,
    Name: 'Fully Tracked Item',
    Description: '2014 Merino Sweater',
    PurchaseDescription: '2014 Merino Sweater',
    PurchaseDetails: {
      UnitPrice: 149.0,
      AccountCode: salesAccountCode,
    },
    SalesDetails: {
      UnitPrice: 299.0,
      AccountCode: salesAccountCode,
    },
  };

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

  it('creates an item', done => {
    const item = currentApp.core.items.newItem(sampleItem);

    item
      .save()
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        expect(response.entities[0].ItemID).to.not.equal('');
        expect(response.entities[0].ItemID).to.not.equal(undefined);
        sampleItem.ItemID = response.entities[0].ItemID;
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('retrieves some items (no paging)', done => {
    currentApp.core.items
      .getItems()
      .then(items => {
        items.forEach(item => {
          expect(item.ItemID).to.not.equal('');
          expect(item.ItemID).to.not.equal(undefined);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('retrieves an item by ID', done => {
    currentApp.core.items
      .getItem(sampleItem.ItemID)
      .then(item => {
        expect(item.ItemID).to.equal(sampleItem.ItemID);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('updates an item by ID', done => {
    const randomName = `Updated ${Math.random()}`;

    currentApp.core.items
      .getItem(sampleItem.ItemID)
      .then(response => {
        const item = response;
        expect(item.ItemID).to.equal(sampleItem.ItemID);

        item.Name = randomName;

        return item.save();
      })
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        expect(response.entities[0].Name).to.equal(randomName);
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('deletes an item', done => {
    currentApp.core.items
      .deleteItem(sampleItem.ItemID)
      .then(() => {
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
