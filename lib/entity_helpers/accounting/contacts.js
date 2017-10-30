const { clone } = require('lodash');
var EntityHelper = require('../entity_helper');
var Contact = require('../../entities/accounting/contact').Contact;
var util = require('util');

var Contacts = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'Contacts' }, options));
    },
    newContact: function(data, options) {
        return new Contact(this.application, data, options)
    },
    getContact: function(id, modifiedAfter) {
        return this.getContacts({ id: id, modifiedAfter: modifiedAfter })
            .then(function(contacts) {
                return contacts[0];
            });
    },
    saveContacts: function(contacts, options) {
        return this.saveEntities(contacts, this.setUpOptions(options));
    },
    getContacts: function(options) {
        return this.getEntities(this.setUpOptions(options));
    },
    setUpOptions: function(options) {
        var self = this;
        var clonedOptions = clone(options || {});
        clonedOptions.entityPath = 'Contacts';
        clonedOptions.entityConstructor = function(data) { return self.newContact(data) };
        return clonedOptions;
    }
})

module.exports = Contacts;