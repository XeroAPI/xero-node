var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger'),
    PaymentSchema = require('./shared').PaymentSchema

var entityName = 'Payment';
var Payment = Entity.extend(PaymentSchema, {
    constructor: function(application, data, options) {
        logger.debug('Payment::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    toXml: function() {
        this.trackEvent(entityName, arguments.callee.name);
        var payment = _.omit(this.toObject());
        return this.application.js2xml(payment, 'Payment');
    },
    save: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var xml = '<Payments>' + this.toXml() + '</Payments>';
        var path, method;
        if (this.PaymentID) {
            path = 'Payments/' + this.PaymentID;
            method = 'post'
        } else {
            path = 'Payments';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, xml, {
            entityPath: 'Payments.Payment',
            entityConstructor: function(data) {
                return self.application.core.payments.createPayment(data);
            }
        });
    }
});


module.exports = Payment;