var _ = require('lodash'),
    Entity = require('../entity');

var UserSchema = Entity.SchemaObject({
    UserID: {
        type: String,
        toObject: 'never'
    },
    EmailAddress: {
        type: String
    },
    FirstName: {
        type: String,
        toObject: 'always',
        validators: {
            maxLength: 255
        }
    },
    LastName: {
        type: String,
        toObject: 'always',
        validators: {
            maxLength: 255
        }
    },
    UpdatedDateUTC: {
        type: Date
    },
    IsSubscriber: {
        type: Boolean
    },
    OrganisationRole: {
        type: String
    }
});


var User = Entity.extend(UserSchema, {
    constructor: function(application, data, options) {
        console.log('User::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {}
});


module.exports.User = User;
module.exports.UserSchema = UserSchema;