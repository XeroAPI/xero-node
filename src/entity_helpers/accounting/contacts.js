var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    Contact = require('../../entities/accounting/contact').Contact,
    util = require('util')

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
                return _.first(contacts);
            })
    },
    saveContacts: function(contacts, options) {
        return this.saveEntities(contacts, this.setUpOptions(options));
    },
    getContacts: function(options) {
        return this.getEntities(this.setUpOptions(options));
    },
    setUpOptions: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'Contacts';
        clonedOptions.entityConstructor = function(data) { return self.newContact(data) };
        return clonedOptions;
    }
})

module.exports = Contacts;