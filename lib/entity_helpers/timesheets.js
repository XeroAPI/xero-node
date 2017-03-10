var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    Timesheet = require('../entities/timesheet'),
    util = require('util')

var entityName = 'TimesheetsHelper';
var Timesheets = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'Timesheet', entityPlural: 'Timesheets' }, options));
    },
    newTimesheet: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new Timesheet(this.application, data, options)
    },
    getTimesheet: function(id, modifiedAfter, where, order) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getTimesheets({ id: id, modifiedAfter: modifiedAfter, where: where, order: order })
            .then(function(timesheets) {
                return _.first(timesheets);
            })
    },
    saveTimesheets: function(timesheets, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.saveEntities(timesheets, Object.assign({}, options, { method: 'post', api: 'payroll' }));
    },
    getTimesheets: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = Object.assign({}, options, { api: 'payroll' });
        clonedOptions.entityConstructor = function(data) { return self.newTimesheet(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Timesheets;