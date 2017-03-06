var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    BankTransfer = require('../entities/banktransfer'),
    p = require('../misc/promise'),
    util = require('util')

var BankTransfers = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, _.extend({ entityName: 'BankTransfer', entityPlural: 'BankTransfers' }, options));
    },
    newBankTransfer: function(data, options) {
        return new BankTransfer(this.application, data, options)
    },
    newBankTransfers: function(data) {
        var that = this;
        return _.map(data, function(item) {
            return new BankTransfer(that.application, item, {});
        });
    },
    getBankTransfer: function(id, modifiedAfter) {
        return this.getBankTransfers({ id: id, modifiedAfter: modifiedAfter })
            .then(function(bankTransfers) {
                return _.first(bankTransfers);
            })
    },
    getBankTransfers: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newBankTransfer(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = BankTransfers;