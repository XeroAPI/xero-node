const { clone } = require('lodash');
var EntityHelper = require('../entity_helper');
var User = require('../../entities/accounting/user').User;
var util = require('util');

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
                return users[0];
            });
    },
    getUsers: function(options) {
        var self = this;
        var clonedOptions = clone(options || {});
        clonedOptions.entityPath = 'Users';
        clonedOptions.entityConstructor = function(data) { return self.newUser(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Users;
