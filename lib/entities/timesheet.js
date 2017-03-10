var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger')


var TimesheetLineSchema = new Entity.SchemaObject({
    EarningsTypeID: { type: String },
    TrackingItemID: { type: String },
    NumberOfUnits: { type: Array, arrayType: Number, toObject: 'always' }
});

var TimesheetSchema = new Entity.SchemaObject({
    EmployeeID: { type: String, toObject: 'hasValue' },
    StartDate: { type: Date, toObjectTransform: Entity.dateToString, toObject: 'hasValue' },
    EndDate: { type: Date, toObjectTransform: Entity.dateToString, toObject: 'hasValue' },
    TimesheetLines: { type: Array, arrayType: TimesheetLineSchema, toObject: 'always' },
    Status: { type: String, toObject: 'hasValue' },
    TimesheetID: { type: String, toObject: 'hasValue' },
    Hours: { type: Number, toObject: 'hasValue' }
});

var entityName = 'Timesheet';
var Timesheet = Entity.extend(TimesheetSchema, {
    constructor: function(application, data, options) {
        logger.debug('Timesheet::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this._super(options);
    },
    _toObject: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this._super(options);
    },
    fromXmlObj: function(obj) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        Object.assign(self, _.omit(obj, 'TimesheetLines'));
        if (obj.TimesheetLines) {
            var items = this.application.asArray(obj.TimesheetLines.TimesheetLine);
            _.each(items, function(item) {

                var index = self.TimesheetLines.push({ EarningsTypeID: item.EarningsTypeID }) - 1;
                var addedNumberOfUnit = self.TimesheetLines[index];
                _.each(item.NumberOfUnits.NumberOfUnit, function(unit) {
                    addedNumberOfUnit.NumberOfUnits.push(unit);
                })

            })
        }

        return this;
    },
    toXml: function() {
        this.trackEvent(entityName, arguments.callee.name);
        var timesheet = _.omit(this.toObject(), 'TimesheetLines');
        Object.assign(timesheet, { TimesheetLines: [] });
        _.forEach(this.TimesheetLines, function(timesheetline) {
            timesheet.TimesheetLines.push({ TimesheetLine: _.pick(timesheetline.toObject(), 'EarningsTypeID', 'TrackingItemID') });
            var addedTimesheetLine = _.last(timesheet.TimesheetLines).TimesheetLine;
            addedTimesheetLine.NumberOfUnits = { NumberOfUnit: [] };
            _.each(timesheetline.NumberOfUnits, function(num) {
                addedTimesheetLine.NumberOfUnits.NumberOfUnit.push(num);
            })

        })

        return this.application.js2xml(timesheet, 'Timesheet');
    },
    save: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
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


module.exports = Timesheet;
module.exports.TimesheetSchema = TimesheetSchema;