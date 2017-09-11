'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const util = common.util;

const currentApp = common.currentApp;

const validatePurchaseOrder = purchaseOrder => {
  if (!purchaseOrder) return false;

  expect(purchaseOrder.PurchaseOrderID).to.be.a('String');
  expect(purchaseOrder.PurchaseOrderNumber).to.be.a('String');
  expect(purchaseOrder.Date).to.be.a('Date');

  if (purchaseOrder.DeliveryDate) {
    expect(purchaseOrder.DeliveryDate).to.be.a('Date');
  }

  expect(purchaseOrder.LineAmountTypes).to.be.a('String');

  if (purchaseOrder.Reference) {
    expect(purchaseOrder.Reference).to.be.a('String');
  }

  if (purchaseOrder.BrandingThemeID) {
    expect(purchaseOrder.BrandingThemeID).to.be.a('String');
  }

  expect(purchaseOrder.CurrencyCode).to.be.a('String');
  expect(purchaseOrder.Status).to.be.a('String');

  if (purchaseOrder.SentToContact) {
    expect(purchaseOrder.SentToContact).to.be.a('Boolean');
  }

  if (purchaseOrder.DeliveryAddress) {
    expect(purchaseOrder.DeliveryAddress).to.be.a('String');
  }

  if (purchaseOrder.AttentionTo) {
    expect(purchaseOrder.AttentionTo).to.be.a('String');
  }

  if (purchaseOrder.Telephone) {
    expect(purchaseOrder.Telephone).to.be.a('String');
  }

  if (purchaseOrder.DeliveryInstructions) {
    expect(purchaseOrder.DeliveryInstructions).to.be.a('String');
  }

  if (purchaseOrder.ExpectedArrivalDate) {
    expect(purchaseOrder.ExpectedArrivalDate).to.be.a('Date');
  }

  expect(purchaseOrder.CurrencyRate).to.be.a('Number');
  expect(purchaseOrder.SubTotal).to.be.a('Number');
  expect(purchaseOrder.TotalTax).to.be.a('Number');
  expect(purchaseOrder.Total).to.be.a('Number');

  if (purchaseOrder.TotalDiscount) {
    expect(purchaseOrder.TotalDiscount).to.be.a('Number');
  }

  if (purchaseOrder.HasAttachments) {
    expect(purchaseOrder.HasAttachments).to.be.a('Boolean');
  }

  if (purchaseOrder.Contact) {
    expect(purchaseOrder.Contact.ContactID).to.be.a('String');
    expect(purchaseOrder.Contact.Name).to.be.a('String');
  }

  if (purchaseOrder.LineItems.length > 0) {
    purchaseOrder.LineItems.forEach(lineItem => {
      expect(lineItem.LineItemID).to.be.a('String');
    });
  }

  return true;
};

describe('Purchase orders', () => {
  const samplePurchaseOrder = {
    Contact: {},
    Date: new Date().toISOString().split('T')[0],
    DeliveryDate: new Date().toISOString().split('T')[0],
    LineAmountTypes: 'Inclusive',
    LineItems: [
      {
        Description: 'Office Chairs',
        Quantity: 5,
        UnitAmount: 120.0,
      },
    ],
  };

  before('get a contact', done => {
    currentApp.core.contacts.getContacts().then(contacts => {
      samplePurchaseOrder.Contact = contacts[0].toJSON();
      done();
    });
  });

  it('creates a Purchase Order', done => {
    const purchaseOrder = common.currentApp.core.purchaseOrders.newPurchaseOrder(
      samplePurchaseOrder
    );

    purchaseOrder
      .save()
      .then(response => {
        expect(validatePurchaseOrder(response.entities[0])).to.equal(true);
        samplePurchaseOrder.PurchaseOrderID =
          response.entities[0].PurchaseOrderID;
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get all purchase orders', done => {
    currentApp.core.purchaseOrders
      .getPurchaseOrders()
      .then(purchaseOrders => {
        expect(purchaseOrders).to.have.length.greaterThan(0);
        purchaseOrders.forEach(purchaseOrder => {
          expect(validatePurchaseOrder(purchaseOrder)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.warn(err);
        done(wrapError(err));
      });
  });

  it('get a single purchase order', done => {
    currentApp.core.purchaseOrders
      .getPurchaseOrder(samplePurchaseOrder.PurchaseOrderID)
      .then(purchaseOrder => {
        expect(validatePurchaseOrder(purchaseOrder)).to.equal(true);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(wrapError(err));
      });
  });

  it('updates a purchase order', done => {
    const reference = `Updated: ${Math.random()}`;
    currentApp.core.purchaseOrders
      .getPurchaseOrder(samplePurchaseOrder.PurchaseOrderID)
      .then(purchaseOrder => {
        purchaseOrder.Reference = reference;

        return purchaseOrder.save();
      })
      .then(response => {
        expect(response.entities[0].Reference).to.equal(reference);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(wrapError(err));
      });
  });

  it('get attachments for purchase orders', done => {
    currentApp.core.purchaseOrders
      .getPurchaseOrders()
      .then(purchaseOrders => {
        if (purchaseOrders.length === 0) done();
        let objectsProcessed = 0;
        purchaseOrders.forEach(purchaseOrder => {
          if (purchaseOrder.HasAttachments === false) return;
          purchaseOrder
            .getAttachments()
            .then(attachments => {
              objectsProcessed += 1;
              attachments.forEach((attachment, index) => {
                expect(attachment.AttachmentID).to.not.equal('');
                expect(attachment.AttachmentID).to.not.equal(undefined);

                if (
                  objectsProcessed === purchaseOrders.length &&
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

        if (objectsProcessed === 0) {
          done();
        }
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
