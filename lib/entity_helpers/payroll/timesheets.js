var EntityHelper = require('../entity_helper');
var Timesheet = require('../../entities/payroll/timesheet').Timesheet;
var util = require('util');

var Timesheets = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'Timesheet', entityPlural: 'Timesheets' }, options));
    },
    newTimesheet: function(data, options) {
        return new Timesheet(this.application, data, options)
    },
    getTimesheet: function(id, modifiedAfter, where, order) {
        return this.getTimesheets({ id: id, modifiedAfter: modifiedAfter, where: where, order: order })
            .then(function(timesheets) {
                return timesheets[0];
            });
    },
    saveTimesheets: function(timesheets, options) {
        return this.saveEntities(timesheets, Object.assign({}, options, { method: 'post', api: 'payroll' }));
    },
    getTimesheets: function(options) {
        var self = this;
        var clonedOptions = Object.assign({}, options, { api: 'payroll' });
        clonedOptions.entityConstructor = function(data) { return self.newTimesheet(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Timesheets;