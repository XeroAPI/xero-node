var _ = require('lodash'),
    Entity = require('../entity'),
    LineItemSchema = require('../shared').LineItemSchema;

var CreditNoteContactSchema = Entity.SchemaObject({
    ContactID: { type: String },
    Name: { type: String }
});

var CreditNoteInvoiceType = Entity.SchemaObject({
    InvoiceID: { type: String },
    InvoiceNumber: { type: String }
});

var CreditNoteAllocationsSchema = Entity.SchemaObject({
    AppliedAmount: { type: Number },
    Date: { type: Date },
    Invoice: {
        type: CreditNoteInvoiceType,
        toObject: 'hasValue'
    },
});

var CreditNoteSchema = Entity.SchemaObject({
    CreditNoteID: { type: String },
    Contact: {
        type: CreditNoteContactSchema,
        toObject: 'hasValue'
    },
    Date: { type: Date, toObject: 'always' },
    Status: { type: String, toObject: 'hasValue' },
    LineAmountTypes: { type: String },
    SubTotal: { type: Number },
    TotalTax: { type: Number },
    Total: { type: Number },
    UpdatedDateUTC: { type: Date, toObject: 'never' },
    CurrencyCode: { type: String },
    FullyPaidOnDate: { type: Date },
    Type: { type: String, toObject: 'always' },
    CreditNoteNumber: { type: String },
    CurrencyRate: { type: Number },
    RemainingCredit: { type: Number },
    Allocations: { type: Array, arrayType: CreditNoteAllocationsSchema },
    LineItems: { type: Array, arrayType: LineItemSchema, toObject: 'hasValue' }
});

var CreditNote = Entity.extend(CreditNoteSchema, {
    constructor: function(application, data, options) {
        console.log('CreditNote::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        return this._super(options);
    },
    _toObject: function(options) {
        return this._super(options);
    },
    getAttachments: function(options) {
        return this.application.core.attachments.getAttachments('CreditNotes/' + this.CreditNoteID, options)
    },
    save: function(options) {
        var self = this;
        var path, method;

        options = options || {};

        if (this.CreditNoteID) {
            path = 'CreditNotes/' + this.CreditNoteID;
            method = 'post'
        } else {
            path = 'CreditNotes';
            method = 'put'
        }

        //Adding other options for saving purposes
        options.entityPath = 'CreditNotes';
        options.entityConstructor = function(data) {
            return self.application.core.creditNotes.newCreditNote(data)
        };

        return this.application.putOrPostEntity(method, path, JSON.stringify(self), options);
    },
    saveAllocations: function(allocations) {
        var self = this;
        var path, method;
        path = 'CreditNotes/' + this.CreditNoteID + "/Allocations";
        method = 'put';

        var payload = {
            Allocations: allocations
        };

        return this.application.putOrPostEntity(method, path, JSON.stringify(payload), {});
    },
});


module.exports.CreditNote = CreditNote;