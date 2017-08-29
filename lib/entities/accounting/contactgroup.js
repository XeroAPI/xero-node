'use strict';

const _ = require('lodash');
const Entity = require('../entity');
const ContactSchema = require('./contact').ContactSchema;

const ContactGroupSchema = Entity.SchemaObject({
  ContactGroupID: { type: String, toObject: 'always' },
  Name: { type: String, toObject: 'always' },
  Status: { type: String, toObject: 'always' },
  Contacts: [ContactSchema],
});

const ContactGroup = Entity.extend(ContactGroupSchema, {
  constructor: function(application, data, options) {
    this.Entity.apply(this, arguments);
  },
  initialize: function(data, options) {},
  save: function(options) {
    const self = this;
    let path = '';
    let method = '';
    if (this.ContactGroupID) {
      path = `ContactGroups/${this.ContactGroupID}`;
      method = 'post';
    } else {
      path = 'ContactGroups';
      method = 'put';
    }
    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(self),
      {
        entityPath: 'ContactGroups',
        entityConstructor: function(data) {
          return self.application.core.contactGroups.newContactGroup(data);
        },
      }
    );
  },
  saveContacts: function(contacts) {
    const self = this;
    const path = `ContactGroups/${this.ContactGroupID}/Contacts`;
    const method = 'put';

    if (!_.isArray(contacts)) {
      contacts = [contacts];
    }

    const payload = {
      Contacts: contacts,
    };

    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(payload),
      {
        entityPath: 'Contacts',
        entityConstructor: function(data) {
          return self.application.core.contacts.newContact(data);
        },
      }
    );
  },
  deleteContact: function(contactID) {
    return this.deleteAllContacts(contactID);
  },
  deleteAllContacts: function(contactID) {
    let path = `ContactGroups/${this.ContactGroupID}/Contacts/`;

    if (contactID) {
      path += contactID;
    }

    return this.application.deleteEntities(path);
  },
});

module.exports.ContactGroup = ContactGroup;
module.exports.ContactGroupSchema = ContactGroupSchema;
