var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    Report = require('../../entities/accounting/report'),
    util = require('util')

var Reports = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'Report', entityPlural: 'Reports' }, options));
    },
    create: function(data, options) {
        return new Report(this.application, data, options)
    },
    generateReport: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.create(data) };
        return this.getEntities(clonedOptions)
            .then(function(reports) {
                return _.first(reports);
            });
    }
})

module.exports = Reports;