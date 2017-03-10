var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    User = require('../entities/user'),
    util = require('util')

var entityName = 'UsersHelper';
var Users = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'User', entityPlural: 'Users' }, options));
    },
    newUser: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new User(this.application, data, options)
    },
    getUser: function(id, modifiedAfter) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getUsers({ id: id, modifiedAfter: modifiedAfter })
            .then(function(users) {
                return _.first(users);
            })
    },
    // JWalsh 27 February 2017 - commented as user save is not supported by the v2.0 API.
    // saveUsers: function(users, options) {
    //     return this.saveEntities(users, options)
    // },
    getUsers: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'Users.User';
        clonedOptions.entityConstructor = function(data) { return self.newUser(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Users;