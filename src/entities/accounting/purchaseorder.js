'use strict';

const Entity = require('../entity');
const ContactSchema = require('./contact').ContactSchema;
const LineItemSchema = require('../shared').LineItemSchema;

const PurchaseOrderSchema = Entity.SchemaObject({
  PurchaseOrderID: { type: String, toObject: 'always' },
  PurchaseOrderNumber: { type: String, toObject: 'always' },
  Date: { type: Date, toObject: 'always' },
  DeliveryDate: { type: Date, toObject: 'always' },
  Contact: { type: ContactSchema, toObject: 'always' },
  LineAmountTypes: { type: String, toObject: 'always' },
  Reference: { type: String, toObject: 'always' },
  LineItems: { type: Array, arrayType: LineItemSchema, toObject: 'always' },
  BrandingThemeID: { type: String, toObject: 'always' },
  CurrencyCode: { type: String, toObject: 'always' },
  Status: { type: String, toObject: 'always' },
  SentToContact: { type: Boolean, toObject: 'always' },
  DeliveryAddress: { type: String, toObject: 'always' },
  AttentionTo: { type: String, toObject: 'always' },
  Telephone: { type: String, toObject: 'always' },
  DeliveryInstructions: { type: String, toObject: 'always' },
  ExpectedArrivalDate: { type: Date, toObject: 'always' },
  CurrencyRate: { type: Number, toObject: 'always' },
  SubTotal: { type: Number, toObject: 'always' },
  TotalTax: { type: Number, toObject: 'always' },
  Total: { type: Number, toObject: 'always' },
  TotalDiscount: { type: Number, toObject: 'always' },
  HasAttachments: { type: Boolean, toObject: 'always' },
});

const PurchaseOrder = Entity.extend(PurchaseOrderSchema, {
  constructor: function(...args) {
    this.Entity.apply(this, args);
  },
  getAttachments: function(options) {
    return this.application.core.attachments.getAttachments(
      `PurchaseOrders/${this.PurchaseOrderID}`,
      options
    );
  },
  save: function() {
    const self = this;
    let path = '';
    let method = '';

    if (this.PurchaseOrderID) {
      path = `PurchaseOrders/${this.PurchaseOrderID}`;
      method = 'post';
    } else {
      path = 'PurchaseOrders';
      method = 'put';
    }

    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(self),
      {
        entityPath: 'PurchaseOrders',
        entityConstructor: data =>
          self.application.core.purchaseOrders.newPurchaseOrder(data),
      }
    );
  },
});

module.exports.PurchaseOrder = PurchaseOrder;
module.exports.PurchaseOrderSchema = PurchaseOrderSchema;
