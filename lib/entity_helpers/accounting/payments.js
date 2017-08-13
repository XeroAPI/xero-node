var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    Payment = require('../../entities/accounting/payment').Payment,
    util = require('util')

var Payments = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'Payments' }, options));
    },
    newPayment: function(data, options) {
        return new Payment(this.application, data, options);
    },
    getPayment: function(id, modifiedAfter) {
        return this.getPayments({ id: id, modifiedAfter: modifiedAfter })
            .then(function(payments) {
                return _.first(payments);
            })
    },
    savePayments: function(payments, options) {
        return this.saveEntities(payments, this.setUpOptions(options));
    },
    getPayments: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newPayment(data) };
        return this.getEntities(clonedOptions)
    },
    setUpOptions: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'Payments';
        clonedOptions.entityConstructor = function(data) { return self.newPayment(data) };
        return clonedOptions;
    }
})

module.exports = Payments;