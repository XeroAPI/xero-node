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
    },
    save: function(options) {
        var xml = '<Users>' + this.toXml() + '</Users>';
        var path, method;
        if (this.UserID) {
            path = 'Users/' + this.UserID;
            method = 'post'
        } else {
            path = 'Users';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, xml, {
            entityPath: 'Users.User',
            entityConstructor: function(data) {
                return self.application.core.users.newUser(data)
            }
        });
    }
});


module.exports = User;
module.exports.UserSchema = UserSchema;