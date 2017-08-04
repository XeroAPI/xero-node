var _ = require('lodash'),
    Entity = require('../entity'),
    PaymentSchema = require('../shared').PaymentSchema

var Payment = Entity.extend(PaymentSchema, {
    constructor: function(application, data, options) {
        
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    save: function(options) {
        var self = this;
        var path, method;
        if (this.PaymentID) {
            path = 'Payments/' + this.PaymentID;
            method = 'post'
        } else {
            path = 'Payments';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, JSON.stringify(self), {
            entityPath: 'Payments',
            entityConstructor: function(data) {
                return self.application.core.payments.newPayment(data);
            }
        });
    }
});


module.exports.Payment = Payment;