'use strict';

const Entity = require('../entity');
const ContactSchema = require('./contact').ContactSchema;
const PaymentSchema = require('../shared').PaymentSchema;
const LineItemSchema = require('../shared').LineItemSchema;
const CreditNoteSchema = require('../shared').CreditNoteSchema;

const InvoiceSchema = Entity.SchemaObject({
  Type: { type: String, toObject: 'hasValue' },
  Contact: { type: ContactSchema, toObject: 'always' },
  LineItems: { type: Array, arrayType: LineItemSchema, toObject: 'hasValue' },
  Date: { type: Date, toObject: 'always' },
  DueDate: { type: Date, toObject: 'always' },
  LineAmountTypes: { type: String, toObject: 'hasValue' },
  InvoiceNumber: { type: String, toObject: 'hasValue' },
  Reference: { type: String, toObject: 'hasValue' },
  BrandingThemeID: { type: String, toObject: 'hasValue' },
  Url: { type: String, toObject: 'hasValue' },
  CurrencyCode: { type: String, toObject: 'hasValue' },
  CurrencyRate: { type: Number, toObject: 'hasValue' },
  Status: { type: String, toObject: 'hasValue' },
  SentToContact: { type: Boolean, toObject: 'hasValue' },
  ExpectedPaymentDate: { type: Date, toObject: 'hasValue' },
  PlannedPaymentDate: { type: Date, toObject: 'hasValue' },
  SubTotal: { type: Number, toObject: 'hasValue' },
  TotalTax: { type: Number, toObject: 'hasValue' },
  Total: { type: Number, toObject: 'hasValue' },
  TotalDiscount: { type: String, toObject: 'hasValue' },
  InvoiceID: { type: String, toObject: 'hasValue' },
  HasAttachments: { type: Boolean, toObject: 'hasValue' },
  Payments: { type: Array, arrayType: PaymentSchema, toObject: 'hasValue' },
  AmountDue: { type: Number, toObject: 'hasValue' },
  AmountPaid: { type: Number, toObject: 'hasValue' },
  FullyPaidOnDate: { type: Date, toObject: 'hasValue' },
  AmountCredited: { type: Number, toObject: 'hasValue' },
  UpdatedDateUTC: { type: Date, toObject: 'never' },
  CreditNotes: { type: Array, arrayType: CreditNoteSchema, toObject: 'always' },
  // Prepayments: {type: Array, arrayType: PrepaymentsSchema, toObject: 'always'},
  // Overpayments: {type: Array, arrayType: OverpaymentsSchema, toObject: 'always'},
});

const Invoice = Entity.extend(InvoiceSchema, {
  constructor: function(...args) {
    this.Entity.apply(this, args);
  },
  changes: function(options) {
    return this._super(options);
  },
  _toObject: function(options) {
    return this._super(options);
  },
  getAttachments: function(options) {
    return this.application.core.attachments.getAttachments(
      `Invoices/${this.InvoiceID}`,
      options
    );
  },
  save: function(opts) {
    const self = this;
    let path = '';
    let method = '';

    const options = opts || {};

    if (this.InvoiceID) {
      path = `Invoices/${this.InvoiceID}`;
      method = 'post';
    } else {
      path = 'Invoices';
      method = 'put';
    }

    // Adding other options for saving purposes
    options.entityPath = 'Invoices';
    options.entityConstructor = function(data) {
      return self.application.core.invoices.newInvoice(data);
    };

    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(self),
      options
    );
  },
});

module.exports.Invoice = Invoice;
module.exports.InvoiceSchema = InvoiceSchema;
module.exports.LineItemSchema = LineItemSchema;
