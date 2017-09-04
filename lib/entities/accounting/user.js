'use strict';

const Entity = require('../entity');

const UserSchema = Entity.SchemaObject({
  UserID: {
    type: String,
    toObject: 'always',
  },
  EmailAddress: {
    type: String,
  },
  FirstName: {
    type: String,
    toObject: 'always',
    validators: {
      maxLength: 255,
    },
  },
  LastName: {
    type: String,
    toObject: 'always',
    validators: {
      maxLength: 255,
    },
  },
  UpdatedDateUTC: {
    type: Date,
  },
  IsSubscriber: {
    type: Boolean,
  },
  OrganisationRole: {
    type: String,
  },
});

const User = Entity.extend(UserSchema, {
  constructor: function(...args) {
    this.Entity.apply(this, args);
  },
});

module.exports.User = User;
module.exports.UserSchema = UserSchema;
