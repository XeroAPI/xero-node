var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')

var TrackingCategorySchema = new Entity.SchemaObject({
    Name: {type:String},
    Option: {type:String},
    TrackingCategoryID: {type:String}
});

var JournalLineSchema = new Entity.SchemaObject({
    JournalLineID: {type:String, searchType:'guid'},
    AccountID: {type:String, searchType:'guid' },
    AccountCode: {type:String},
    AccountType: {type:String},
    AccountName: {type:String},
    NetAmount: {type:Number},
    GrossAmount: {type:Number},
    TaxAmount: {type:Number},
    TaxType: {type:String},
    TaxName: {type:String},
    JournalID: {type:String},
    TrackingCategories:[TrackingCategorySchema]
});

var JournalSchema = new Entity.SchemaObject({
    JournalID: {type:String, searchType:'guid'},
    JournalDate: {type:Date},
    JournalNumber: {type:String},
    CreatedDateUTC: {type:Date},
    Reference: {type:String},
    JournalLines: [JournalLineSchema]
});


var Journal = Entity.extend(JournalSchema, {
    constructor: function (application, data, options)
    {
        logger.debug('Journal::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function (data, options)
    {
    },
    changes: function (options)
    {
        return this._super(options);
    },
    _toObject: function (options)
    {
        return this._super(options);
    },
    fromXmlObj: function (obj)
    {
        var self = this;
        _.extend(self, _.omit(obj, 'JournalLines'));
        if (obj.JournalLines) {
            var journalLines = this.application.asArray(obj.JournalLines.JournalLine);
            _.each(journalLines, function (journalLine)
            {
                self.JournalLines.push(journalLine);
            })
        }

        return this;
    },
    toXml: function ()
    {

    }
});


module.exports = Journal;
module.exports.JournalSchema = JournalSchema;
