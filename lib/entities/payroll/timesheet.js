var _ = require('lodash'),
    Entity = require('../entity')


var TimesheetLineSchema = Entity.SchemaObject({
    EarningsRateID: { type: String },
    TrackingItemID: { type: String },
    NumberOfUnits: { type: Array, arrayType: Number, toObject: 'always' }
});

var TimesheetSchema = Entity.SchemaObject({
    EmployeeID: { type: String, toObject: 'hasValue' },
    StartDate: { type: Date, toObjectTransform: Entity.dateToString, toObject: 'hasValue' },
    EndDate: { type: Date, toObjectTransform: Entity.dateToString, toObject: 'hasValue' },
    TimesheetLines: { type: Array, arrayType: TimesheetLineSchema, toObject: 'always' },
    Status: { type: String, toObject: 'hasValue' },
    TimesheetID: { type: String, toObject: 'hasValue' },
    Hours: { type: Number, toObject: 'hasValue' }
});

var Timesheet = Entity.extend(TimesheetSchema, {
    constructor: function(application, data, options) {
        
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
        Object.assign(self, _.omit(obj, 'TimesheetLines'));
        /**
         * Code commented as the 'asArray' function has been removed.
         */

        /*
        if (obj.TimesheetLines) {
            var items = this.application.asArray(obj.TimesheetLines.TimesheetLine);
            _.each(items, function(item) {

                var index = self.TimesheetLines.push({ EarningsRateID: item.EarningsRateID }) - 1;
                var addedNumberOfUnit = self.TimesheetLines[index];
                _.each(item.NumberOfUnits.NumberOfUnit, function(unit) {
                    addedNumberOfUnit.NumberOfUnits.push(unit);
                })

            })
        }
        */

        return this;
    },
    toXml: function() {
        var timesheet = _.omit(this.toObject(), 'TimesheetLines');
        Object.assign(timesheet, { TimesheetLines: [] });
        _.forEach(this.TimesheetLines, function(timesheetline) {
            timesheet.TimesheetLines.push({ TimesheetLine: _.pick(timesheetline.toObject(), 'EarningsRateID', 'TrackingItemID') });
            var addedTimesheetLine = _.last(timesheet.TimesheetLines).TimesheetLine;
            addedTimesheetLine.NumberOfUnits = { NumberOfUnit: [] };
            _.each(timesheetline.NumberOfUnits, function(num) {
                addedTimesheetLine.NumberOfUnits.NumberOfUnit.push(num);
            })

        })

        return this.application.js2xml(timesheet, 'Timesheet');
    },
    save: function(options) {
        var self = this
        var xml = '<Timesheets>' + this.toXml() + '</Timesheets>';
        var path, method;
        if (this.TimesheetID) {
            path = 'Timesheets/' + this.TimesheetID;
            method = 'post'
        } else {
            path = 'Timesheets';
            method = 'post'
        }
        return this.application.putOrPostEntity(method, path, xml, { entityPath: 'Timesheets.Timesheet', entityConstructor: function(data) { return self.application.payroll.timesheets.newTimesheet(data) }, api: 'payroll' });
    }

});


module.exports.Timesheet = Timesheet;
module.exports.TimesheetSchema = TimesheetSchema;
