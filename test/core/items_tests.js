'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;
const util = common.util;
const uuid = common.uuid;

const currentApp = common.currentApp;

describe('items', function() {
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

  it('creates an item', function(done) {
    const item = currentApp.core.items.newItem(sampleItem);

    item
      .save()
      .then(function(response) {
        expect(response.entities).to.have.length.greaterThan(0);
        expect(response.entities[0].ItemID).to.not.equal('');
        expect(response.entities[0].ItemID).to.not.equal(undefined);
        sampleItem.ItemID = response.entities[0].ItemID;
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('retrieves some items (no paging)', function(done) {
    currentApp.core.items
      .getItems()
      .then(function(items) {
        items.forEach(function(item) {
          expect(item.ItemID).to.not.equal('');
          expect(item.ItemID).to.not.equal(undefined);
        });
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('retrieves an item by ID', function(done) {
    currentApp.core.items
      .getItem(sampleItem.ItemID)
      .then(function(item) {
        expect(item.ItemID).to.equal(sampleItem.ItemID);
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('updates an item by ID', function(done) {
    const randomName = `Updated ${Math.random()}`;

    currentApp.core.items
      .getItem(sampleItem.ItemID)
      .then(function(response) {
        const item = response;
        expect(item.ItemID).to.equal(sampleItem.ItemID);

        item.Name = randomName;

        return item.save();
      })
      .then(function(response) {
        expect(response.entities).to.have.length.greaterThan(0);
        expect(response.entities[0].Name).to.equal(randomName);
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('deletes an item', function(done) {
    currentApp.core.items
      .deleteItem(sampleItem.ItemID)
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
