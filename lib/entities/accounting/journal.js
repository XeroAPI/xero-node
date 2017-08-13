var _ = require('lodash'),
    Entity = require('../entity')

var TrackingCategorySchema = Entity.SchemaObject({
    TrackingCategoryID: { type: String },
    Name: { type: String },
    Status: { type: String },
    Options: { type: String }
});

var JournalLineSchema = Entity.SchemaObject({
    JournalLineID: { type: String, searchType: 'guid' },
    AccountID: { type: String, searchType: 'guid' },
    AccountCode: { type: String },
    AccountType: { type: String },
    AccountName: { type: String },
    NetAmount: { type: Number },
    GrossAmount: { type: Number },
    TaxAmount: { type: Number },
    TaxType: { type: String },
    TaxName: { type: String },
    TrackingCategories: [TrackingCategorySchema]
});

var JournalSchema = Entity.SchemaObject({
    JournalID: { type: String, searchType: 'guid' },
    JournalDate: { type: Date },
    JournalNumber: { type: String },
    CreatedDateUTC: { type: Date },
    Reference: { type: String },
    SourceID: { type: String },
    SourceType: { type: String },
    JournalLines: [JournalLineSchema]
});

var Journal = Entity.extend(JournalSchema, {
    constructor: function(application, data, options) {
        
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        return this._super(options);
    },
    _toObject: function(options) {
        return this._super(options);
    }
});


module.exports.Journal = Journal;
module.exports.JournalSchema = JournalSchema;