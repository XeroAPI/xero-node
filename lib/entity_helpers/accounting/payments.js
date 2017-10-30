const { clone } = require('lodash');
var EntityHelper = require('../entity_helper');
var Payment = require('../../entities/accounting/payment').Payment;
var util = require('util');

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
                return payments[0];
            });
    },
    savePayments: function(payments, options) {
        return this.saveEntities(payments, this.setUpOptions(options));
    },
    getPayments: function(options) {
        var self = this;
        var clonedOptions = clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newPayment(data) };
        return this.getEntities(clonedOptions)
    },
    setUpOptions: function(options) {
        var self = this;
        var clonedOptions = clone(options || {});
        clonedOptions.entityPath = 'Payments';
        clonedOptions.entityConstructor = function(data) { return self.newPayment(data) };
        return clonedOptions;
    }
})

module.exports = Payments;