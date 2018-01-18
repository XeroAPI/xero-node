var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    User = require('../../entities/accounting/user').User,
    util = require('util')

var Users = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'Users' }, options));
    },
    newUser: function(data, options) {
        return new User(this.application, data, options)
    },
    getUser: function(id, modifiedAfter) {
        return this.getUsers({ id: id, modifiedAfter: modifiedAfter })
            .then(function(users) {
                return _.first(users);
            })
    },
    getUsers: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'Users';
        clonedOptions.entityConstructor = function(data) { return self.newUser(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Users;
