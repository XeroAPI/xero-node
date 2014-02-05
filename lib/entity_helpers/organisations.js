var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , Organisation = require('../entities/organisation')
    , p = require('../misc/promise')
    , util = require('util')

var Organisations = EntityHelper.extend({
    constructor: function(application,options)
    {
        EntityHelper.apply(this,arguments);
    },
    getOrganisations: function (options,callback)
    {
        options = options || {};
        var self = this;
        var path = 'Organisations';

        var clonedOptions = _.clone(options || {});
        options.entityPath = 'Organisations.Organisation';
        options.entityConstructor = function(data) { return new Organisation(this.application)};
        return this.application.getEntities(path, options)
            .then(function(organisations)
            {
                callback && callback(null,organisations);
                return organisations;
            })
            .fail(function(err)
            {
                callback && callback(err);
                throw err;
            })
    },
    getOrganisation: function(callback)
    {
        return this.getOrganisations()
            .then(function(organisations)
            {
                callback && callback(null,_.first(organisations));
                return _.first(organisations);
            })
            .fail(function(err)
            {
                callback && callback(err);
                throw err;
            })
    }
})

module.exports = Organisations;

