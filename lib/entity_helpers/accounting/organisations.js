const { clone } = require('lodash');
var EntityHelper = require('../entity_helper');
var Organisation = require('../../entities/accounting/organisation').Organisation;
var util = require('util');

var Organisations = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'Organisations' }, options));
    },
    getOrganisations: function(options, callback) {
        var self = this;
        var clonedOptions = clone(options || {});
        clonedOptions.entityConstructor = function(data) { return new Organisation(data) };
        return this.getEntities(clonedOptions)
    },
    getOrganisation: function(callback) {
        return this.getOrganisations()
            .then(function(organisations) {
                callback && callback(null, organisations[0]);
                return organisations[0];
            })
            .catch(function(err) {
                callback && callback(err);
                throw err;
            });
    }
})

module.exports = Organisations;