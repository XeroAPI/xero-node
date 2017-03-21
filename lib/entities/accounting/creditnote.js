var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger'),
    LineItemSchema = require('../shared').LineItemSchema;

var CreditNoteContactSchema = new Entity.SchemaObject({
    ContactID: { type: String },
    Name: { type: String }
});

var CreditNoteInvoiceType = new Entity.SchemaObject({
    InvoiceID: { type: String },
    InvoiceNumber: { type: String }
});

var CreditNoteAllocationsSchema = new Entity.SchemaObject({
    AppliedAmount: { type: Number },
    Date: { type: String },
    Invoice: {
        type: CreditNoteInvoiceType,
        toObject: 'hasValue'
    },
});

var CreditNoteSchema = new Entity.SchemaObject({
    CreditNoteID: { type: String },
    Contact: {
        type: CreditNoteContactSchema,
        toObject: 'hasValue'
    },
    Date: { type: Date },
    Status: { type: String },
    LineAmountTypes: { type: String },
    SubTotal: { type: Number },
    TotalTax: { type: Number },
    Total: { type: Number },
    UpdatedDateUTC: { type: String },
    CurrencyCode: { type: String },
    FullyPaidOnDate: { type: String },
    Type: { type: String },
    CreditNoteID: { type: String },
    CreditNoteNumber: { type: String },
    CurrencyRate: { type: Number },
    RemainingCredit: { type: Number },
    Allocations: { type: Array, arrayType: CreditNoteAllocationsSchema },
    LineItems: { type: Array, arrayType: LineItemSchema, toObject: 'hasValue' }
});

var CreditNote = Entity.extend(CreditNoteSchema, {
    constructor: function(application, data, options) {
        logger.debug('CreditNote::constructor');
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
        Object.assign(self, _.omit(obj, 'LineItems'));
        if (obj.LineItems) {
            this.extractArray(obj.LineItems.LineItem, this.LineItems);
        }

        return this;
    },
});


module.exports = CreditNote;