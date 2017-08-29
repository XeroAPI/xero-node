'use strict';

const _ = require('lodash');
const EntityHelper = require('../entity_helper');
const ContactGroup = require('../../entities/accounting/contactgroup').ContactGroup;

const ContactGroups = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'ContactGroups' }, options)
    );
  },
  newContactGroup: function(data, options) {
    return new ContactGroup(this.application, data, options);
  },
  getContactGroups: function(options) {
    return this.getEntities(this.setUpOptions(options));
  },
  getContactGroup: function(id) {
    return this.getContactGroups({ id }).then(contactGroups =>
      _.first(contactGroups)
    );
  },
  saveContactGroups: function(contactGroups, options) {
    return this.saveEntities(contactGroups, this.setUpOptions(options));
  },
  setUpOptions: function(options) {
    const self = this;
    const clonedOptions = _.clone(options || {});
    clonedOptions.entityPath = 'ContactGroups';
    clonedOptions.entityConstructor = data => self.newContactGroup(data);
    return clonedOptions;
  }
});

module.exports = ContactGroups;
