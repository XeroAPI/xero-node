var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , Contact = require('../entities/contact')
    , p = require('../misc/promise')
    , util = require('util')

var Contacts = EntityHelper.extend({
    constructor: function (application, options)
    {
        EntityHelper.apply(this, arguments);
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
    createContacts: function (contacts, options)
    {

    },
    getContacts: function (options)
    {
        options = options || {};
        var self = this;
        var path = 'Contacts';
        if (options.id)
            path += '/' + options.id;

        var clonedOptions = _.clone(options || {});
        options.entityPath = 'Contacts.Contact';
        options.entityConstructor = function(data) { return self.newContact(data)};
        return this.application.getEntities(path, options);
    }
})

module.exports = Contacts;

