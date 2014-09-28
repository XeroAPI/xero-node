var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , Contact = require('../entities/contact')
    , p = require('../misc/promise')
    , util = require('util')

var Contacts = EntityHelper.extend({
    constructor: function (application, options)
    {
        EntityHelper.call(this, application, _.extend({ entityName:'Contact', entityPlural:'Contacts'}, options));
    },
    newContact: function (data, options)
    {
        return new Contact(this.application, data, options)
    },
    getContact: function (id, modifiedAfter)
    {
        return this.getContacts({ id: id, modifiedAfter: modifiedAfter})
            .then(function (contacts)
            {
                return _.first(contacts);
            })
    },
    saveContacts: function (contacts, options)
    {
        return this.saveEntities(contacts, options)
    },
    getContacts: function (options)
    {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newContact(data)};
        return this.getEntities(clonedOptions)
    }
})

module.exports = Contacts;

