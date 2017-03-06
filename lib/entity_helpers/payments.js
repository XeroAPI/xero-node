var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    Payment = require('../entities/payment'),
    p = require('../misc/promise'),
    util = require('util')

var Payments = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, _.extend({ entityName: 'Payment', entityPlural: 'Payments' }, options));
    },
    createPayment: function(data, options) {
        return new Payment(this.application, data, options);
    },
    getPayment: function(id, modifiedAfter) {
        return this.getPayments({ id: id, modifiedAfter: modifiedAfter })
            .then(function(payments) {
                return _.first(payments);
            })
    },
    getPayments: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.createPayment(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Payments;