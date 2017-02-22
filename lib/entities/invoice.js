var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger'),
    ContactSchema = require('./contact').ContactSchema,
    Contact = require('./contact'),
    PaymentSchema = require('./shared').PaymentSchema


var TrackingCategorySchema = new Entity.SchemaObject({
    Name: { type: String },
    Options: { type: String }
});
var LineItemSchema = new Entity.SchemaObject({
    Description: { type: String },
    Quantity: { type: Number },
    UnitAmount: { type: Number },
    ItemCode: { type: String },
    AccountCode: { type: String },
    TaxType: { type: String },
    TaxAmount: { type: Number },
    LineAmount: { type: Number },
    Tracking: { type: Array, arrayType: TrackingCategorySchema, toObject: 'always' },
    DiscountRate: { type: Number }
});

var InvoiceSchema = new Entity.SchemaObject({
    Type: { type: String, toObject: 'hasValue' },
    Contact: { type: ContactSchema, toObject: 'hasValue' },
    LineItems: { type: Array, arrayType: LineItemSchema, toObject: 'hasValue' },
    Date: { type: String, toObject: 'hasValue' },
    DueDate: { type: String, toObject: 'hasValue' },
    LineAmountTypes: { type: String, toObject: 'hasValue' },
    InvoiceNumber: { type: String, toObject: 'hasValue' },
    Reference: { type: String, toObject: 'hasValue' },
    BrandingThemeID: { type: String, toObject: 'hasValue' },
    URL: { type: String, toObject: 'hasValue' },
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
    UpdatedDateUTC: { type: Date, toObject: 'hasValue' }
    //CreditNotes: {type: Array, arrayType: CreditNoteSchema, toObject: 'always'},
    //Prepayments: {type: Array, arrayType: PrepaymentsSchema, toObject: 'always'},
    //Overpayments: {type: Array, arrayType: OverpaymentsSchema, toObject: 'always'},
});

var Invoice = Entity.extend(InvoiceSchema, {
    constructor: function(application, data, options) {
        logger.debug('Invoice::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        return this._super(options);
    },
    _toObject: function(options) {
        return this._super(options);
    },
    fromXmlObj: function(obj) {
        var self = this;
        _.extend(self, _.omit(obj, 'LineItems', 'Payments'));
        if (obj.LineItems) {
            this.extractArray(obj.LineItems.LineItem, this.LineItems);
        }

        if (obj.Payments) {
            this.extractArray(obj.Payments.Payment, this.Payments);
        }

        return this;
    },
    toXml: function() {
        var invoice = _.omit(this.toObject(), 'LineItems', 'Payments', 'CreditNotes', 'InvoiceID', 'HasAttachments', 'AmountDue', 'AmountPaid', 'FullyPaidOnDate', 'AmountCredited', 'UpdatedDateUTC');
        _.extend(invoice, { LineItems: { LineItem: [] } });
        _.forEach(this.LineItems, function(lineItem) {
            invoice.LineItems.LineItem.push(lineItem.toObject())
        })
        return this.application.js2xml(invoice, 'Invoice');

    },
    getAttachments: function(options) {
        return this.application.core.attachments.getAttachments('Invoices/' + this.InvoiceID, options)
    },
    getAttachmentContent: function(fileName, options) {
        return this.application.core.attachments.getContent('Invoices/' + this.InvoiceID, fileName, options);
    },
    save: function(options) {
        var self = this;
        var xml = '<Invoices>' + this.toXml() + '</Invoices>';
        var path, method;

        options = options || {};

        if (this.InvoiceID) {
            path = 'Invoices/' + this.InvoiceID;
            method = 'post'
        } else {
            path = 'Invoices';
            method = 'put'
        }

        //Adding other options for saving purposes
        options.entityPath = 'Invoices.Invoice';
        options.entityConstructor = function(data) {
            return self.application.core.invoices.newInvoice(data)
        };

        return this.application.putOrPostEntity(method, path, xml, options);
    }

});


module.exports = Invoice;
module.exports.InvoiceSchema = InvoiceSchema;