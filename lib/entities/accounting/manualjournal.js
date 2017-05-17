var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger'),
    TrackingCategory = require('./trackingcategory');

var ManualJournalLineSchema = new Entity.SchemaObject({
    LineAmount: {
        type: Number,
        toObject: 'hasValue'
    },
    AccountCode: {
        type: String,
        toObject: 'hasValue'
    },
    Description: {
        type: String,
        toObject: 'hasValue'
    },
    TaxType: {
        type: String,
        toObject: 'hasValue'
    },
    Tracking: [TrackingCategory.TrackingCategorySchema]
});

var ManualJournalSchema = new Entity.SchemaObject({
    Narration: {
        type: String,
        toObject: 'hasValue'
    },
    Date: {
        type: String,
        toObject: 'hasValue'
    },
    LineAmountTypes: {
        type: String,
        toObject: 'hasValue'
    },
    Status: {
        type: String,
        toObject: 'hasValue'
    },
    Url: {
        type: String,
        toObject: 'hasValue'
    },
    ShowOnCashBasisReports: {
        type: Boolean,
        toObject: 'hasValue'
    },
    JournalLines: {
        type: Array,
        arrayType: ManualJournalLineSchema,
        toObject: 'hasValue'
    }
});

var ManualJournal = Entity.extend(ManualJournalSchema, {
    constructor: function(application, data, options) {
        logger.debug('ManualJournal::constructor');
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
        Object.assign(self, _.omit(obj, 'JournalLines'));
        if (obj.JournalLines) {
            this.extractArray(obj.JournalLines.JournalLine, this.JournalLines);
        }

        return this;
    },
    toXml: function() {
        var manualJournal = _.omit(this.toObject(), 'JournalLines');

        Object.assign(manualJournal, {
            JournalLines: {
                JournalLine: []
            }
        });
        _.forEach(this.JournalLines, function(journalLines) {
            manualJournal.JournalLines.JournalLine.push(journalLines.toObject());
        });
        return this.application.js2xml(manualJournal, 'ManualJournal');
    },
    save: function() {
        var self = this;
        var xml = '<ManualJournals>' + this.toXml() + '</ManualJournals>';
        var path, method;
        if (this.JournalID) {
            path = 'ManualJournals/' + this.JournalID;
            method = 'post'
        } else {
            path = 'ManualJournals';
            method = 'put'
        }

        return this.application.putOrPostEntity(method, path, xml, {
            entityPath: 'ManualJournals.ManualJournal',
            entityConstructor: function(data) {
                return self.application.core.manualjournals.newManualJournal(data)
            }
        })
    }
});

module.exports = ManualJournal;