var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , Timesheet = require('../entities/timesheet')
    , p = require('../misc/promise')
    , util = require('util')

var Timesheets = EntityHelper.extend({
    constructor: function (application, options)
    {
        EntityHelper.call(this, application, _.extend({ entityName:'Timesheet', entityPlural:'Timesheets'}, options));
    },
    newTimesheet: function (data, options)
    {
        return new Timesheet(this.application, data, options)
    },
    getTimesheet: function (id, modifiedAfter,where, order)
    {
        return this.getTimesheets({ id: id, modifiedAfter: modifiedAfter, where: where, order: order})
            .then(function (timesheets)
            {
                return _.first(timesheets);
            })
    },
    saveTimesheets: function (timesheets, options)
    {
        return this.saveEntities(timesheets, _.extend({},options,{ method: 'post',api: 'payroll'}));
    },
    getTimesheets: function (options)
    {
        var self = this;
        var clonedOptions = _.extend({},options, { api: 'payroll'});
        clonedOptions.entityConstructor = function(data) { return self.newTimesheet(data)};
        return this.getEntities(clonedOptions)
    }
})

module.exports = Timesheets;

