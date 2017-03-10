var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    Contact = require('../entities/contact'),
    util = require('util')

var entityName = 'ContactsHelper';
var Contacts = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'Contact', entityPlural: 'Contacts' }, options));
    },
    newContact: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new Contact(this.application, data, options)
    },
    getContact: function(id, modifiedAfter) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getContacts({ id: id, modifiedAfter: modifiedAfter })
            .then(function(contacts) {
                return _.first(contacts);
            })
    },
    saveContacts: function(contacts, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.saveEntities(contacts, this.setUpOptions(options));
    },
    getContacts: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getEntities(this.setUpOptions(options));
    },
    setUpOptions: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'Contacts.Contact';
        clonedOptions.entityConstructor = function(data) { return self.newContact(data) };
        return clonedOptions;
    }
})

module.exports = Contacts;