'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;
const util = common.util;
const uuid = common.uuid;

const currentApp = common.currentApp;

describe('tracking categories', function() {
  let sampleTrackingCategory = {
    Name: 'My First Category',
  };
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

  it('creates a tracking category', function(done) {
    const myTrackingCategory = currentApp.core.trackingCategories.newTrackingCategory(
      sampleTrackingCategory
    );

    myTrackingCategory
      .save()
      .then(function(response) {
        expect(response.entities).to.have.length.greaterThan(0);
        expect(response.entities[0].TrackingCategoryID).to.not.equal('');
        expect(response.entities[0].TrackingCategoryID).to.not.equal(undefined);
        expect(response.entities[0].Name).to.equal(sampleTrackingCategory.Name);
        sampleTrackingCategory = response.entities[0];
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('creates some options for the tracking category', function(done) {
    const TrackingOptions = [
      {
        Name: 'up',
      },
      {
        Name: 'down',
      },
    ];

    sampleTrackingCategory
      .saveTrackingOptions(TrackingOptions)
      .then(function(response) {
        expect(response.entities).to.have.length.greaterThan(0);

        response.entities.forEach(function(trackingOption) {
          expect(trackingOption.Name).to.not.equal('');
          expect(trackingOption.Name).to.not.equal(undefined);
          expect(trackingOption.Status).to.equal('ACTIVE');
        });
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('updates one of the options for the tracking category', function(done) {
    const TrackingOptions = {
      Name: 'left',
    };

    currentApp.core.trackingCategories
      .getTrackingCategory(sampleTrackingCategory.TrackingCategoryID)
      .then(function(trackingCategory) {
        const optionIDtoUpdate = trackingCategory.Options[0].TrackingOptionID;

        trackingCategory
          .saveTrackingOptions(TrackingOptions, optionIDtoUpdate)
          .then(function(response) {
            expect(response.entities).to.have.length.greaterThan(0);
            expect(response.entities[0].Name).to.equal('left');
            done();
          })
          .catch(function(err) {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('deletes the tracking category', function(done) {
    currentApp.core.trackingCategories
      .deleteTrackingCategory(sampleTrackingCategory.TrackingCategoryID)
      .then(function() {
        // console.log(response)
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('Uses a tracking category on an invoice - REGION', function(done) {
    // TODO refactor this setup and teardown into hooks
    // Create the tracking category

    const trackingCategory = currentApp.core.trackingCategories.newTrackingCategory(
      {
        Name: uuid.v4(),
      }
    );

    let trackingCategoryName;
    let trackingCategoryID;

    trackingCategory
      .save()
      .then(function(response) {
        trackingCategoryName = response.entities[0].Name;
        trackingCategoryID = response.entities[0].TrackingCategoryID;
        response.entities[0].saveTrackingOptions([
          { Name: 'North' },
          { Name: 'South' },
        ]);
      })
      .then(function() {
        // Create an invoice with the sample tracking category attached to the line item on the invoice.
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
                  TrackingCategory: {
                    Name: trackingCategoryName,
                    Option: 'North',
                  },
                },
              ],
            },
          ],
        });
        invoice
          .save()
          .then(function(response) {
            expect(response.entities).to.have.length.greaterThan(0);
            expect(response.entities[0].InvoiceID).to.not.equal(undefined);
            expect(response.entities[0].InvoiceID).to.not.equal('');

            response.entities[0].LineItems.forEach(function(lineItem) {
              // expect(lineItem.Tracking).to.have.length.greaterThan(0)
              lineItem.Tracking.forEach(function(thisTrackingCategory) {
                expect(thisTrackingCategory.TrackingCategoryID).to.not.equal(
                  undefined
                );
                expect(thisTrackingCategory.TrackingCategoryID).to.not.equal('');
                expect(thisTrackingCategory.TrackingOptionID).to.not.equal(
                  undefined
                );
                expect(thisTrackingCategory.TrackingOptionID).to.not.equal('');
                expect(thisTrackingCategory.Name).to.equal(trackingCategory.Name);
                expect(thisTrackingCategory.Option).to.equal('North');
              });
            });
            currentApp.core.trackingCategories
              .deleteTrackingCategory(trackingCategoryID)
              .then(function() {
                done();
              });
          })
          .catch(function(err) {
            console.error(util.inspect(err, null, null));
            done(wrapError(err));
          });
      });
  });

  // unfortunately this will only work on tracking categories that have been used.
  it.skip('archives a tracking category', function(done) {
    sampleTrackingCategory.Status = 'ARCHIVED';

    sampleTrackingCategory
      .save()
      .then(function(response) {
        expect(response.entities).to.have.length.greaterThan(0);
        expect(response.entities[0].TrackingCategoryID).to.not.equal('');
        expect(response.entities[0].TrackingCategoryID).to.not.equal(undefined);
        expect(response.entities[0].Name).to.equal(sampleTrackingCategory.Name);
        expect(response.entities[0].Status).to.equal(
          sampleTrackingCategory.Status
        );
        done();
      })
      .catch(function(err) {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
