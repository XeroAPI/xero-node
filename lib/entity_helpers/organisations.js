var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    Organisation = require('../entities/organisation'),
    util = require('util')

var entityName = 'OrganisationsHelper';
var Organisations = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'Organisation', entityPlural: 'Organisations' }, options));
    },
    getOrganisations: function(options, callback) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return new Organisation(data) };
        return this.getEntities(clonedOptions)
    },
    getOrganisation: function(callback) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getOrganisations()
            .then(function(organisations) {
                callback && callback(null, _.first(organisations));
                return _.first(organisations);
            })
            .catch(function(err) {
                callback && callback(err);
                throw err;
            })
    }
})

module.exports = Organisations;