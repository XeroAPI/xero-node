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
    getOrganisation: function()
    {
        var self = this;
        return this._application.get('Organisation')
            .then(function(ret)
            {
                var organisation = new Organisation(self._application);
                return self._application.xml2js(ret.data)
                    .then(function(obj)
                    {
                        return organisation.fromXmlObj(obj.Response.Organisations.Organisation);
                    });

            });
    }
})

module.exports = Organisations;

