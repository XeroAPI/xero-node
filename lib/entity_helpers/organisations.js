var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    Organisation = require('../entities/organisation'),
    p = require('../misc/promise'),
    util = require('util')

var Organisations = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, _.extend({ entityName: 'Organisation', entityPlural: 'Organisations' }, options));
    },
    getOrganisations: function(options, callback) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return new Organisation(data) };
        return this.getEntities(clonedOptions)
    },
    getOrganisation: function(callback) {
        return this.getOrganisations()
            .then(function(organisations) {
                callback && callback(null, _.first(organisations));
                return _.first(organisations);
            })
            .fail(function(err) {
                callback && callback(err);
                throw err;
            })
    }
})

module.exports = Organisations;