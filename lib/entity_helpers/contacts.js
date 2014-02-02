var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , Contact = require('../entities/contact')
    , p = require('../misc/promise')
    , util = require('util')

var Contacts = EntityHelper.extend({
    constructor: function(application,options)
    {
        EntityHelper.apply(this,arguments);
    },
    newContact: function(data,options)
    {
        return new Contact(self._application, data,options)
    },

    getContacts: function(options)
    {
        var self = this;
        return this._application.get('Organisation')
            .then(function(ret)
            {
                var contact = new Contact(self._application);
                return organisation.fromXmlObj(ret.data);
            });
    }
})

module.exports = Organisations;

