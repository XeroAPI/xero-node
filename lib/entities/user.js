var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger')

var UserSchema = new Entity.SchemaObject({
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
        logger.debug('User::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    toXml: function() {
        var user = _.omit(this.toObject());
        return this.application.js2xml(user, 'User');
    }
});


module.exports = User;
module.exports.UserSchema = UserSchema;