var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    BankTransfer = require('../entities/banktransfer'),
    util = require('util')

var entityName = 'BankTransfersHelper';
var BankTransfers = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'BankTransfer', entityPlural: 'BankTransfers' }, options));
    },
    newBankTransfer: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new BankTransfer(this.application, data, options)
    },
    newBankTransfers: function(data) {
        this.trackEvent(entityName, arguments.callee.name);
        var that = this;
        return _.map(data, function(item) {
            return new BankTransfer(that.application, item, {});
        });
    },
    getBankTransfer: function(id, modifiedAfter) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getBankTransfers({ id: id, modifiedAfter: modifiedAfter })
            .then(function(bankTransfers) {
                return _.first(bankTransfers);
            })
    },
    getBankTransfers: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newBankTransfer(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = BankTransfers;