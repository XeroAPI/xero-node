var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    PayItemsObject = require('../entities/payitems'),
    EarningsType = require('../entities/payitems').EarningsType,
    BenefitType = require('../entities/payitems').BenefitType,
    DeductionType = require('../entities/payitems').DeductionType,
    ReimbursementType = require('../entities/payitems').ReimbursementType,
    TimeOffType = require('../entities/payitems').TimeOffType,
    util = require('util')

var entityName = 'PayItemsHelper';
var PayItems = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({
            entityPlural: 'PayItems',
            path: 'Payitems'
        }, options));
    },
    newPayItems: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new PayItemsObject(this.application, data, options)
    },
    newEarningType: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new EarningsType(this.application, data, options)
    },
    newDeductionType: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new DeductionType(this.application, data, options)
    },
    newBenefitType: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new BenefitType(this.application, data, options)
    },
    newReimbursementType: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new ReimbursementType(this.application, data, options)
    },
    newTimeOffType: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new TimeOffType(this.application, data, options)
    },
    getPayItems: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = Object.assign({}, options, { api: 'payroll' });
        clonedOptions.entityConstructor = function(data) { return self.newPayItems(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = PayItems;