var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    PayItemsObject = require('../../entities/payroll/payitems').PayItems,
    EarningsRate = require('../../entities/payroll/payitems').EarningsRate,
    DeductionType = require('../../entities/payroll/payitems').DeductionType,
    ReimbursementType = require('../../entities/payroll/payitems').ReimbursementType,
    LeaveType = require('../../entities/payroll/payitems').LeaveType,
    util = require('util')

var PayItems = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({
            entityPlural: 'PayItems',
            path: 'PayItems'
        }, options));
    },
    newPayItems: function(data, options) {
        return new PayItemsObject(this.application, data, options)
    },
    /*Earnings Rates*/
    newEarningsRate: function(data, options) {
        return new EarningsRate(this.application, data, options)
    },
    deleteEarningsRate: function(id) {
        return deletePayItem(this, 'EarningsRate', id)
    },
    getEarningsRate: function(id) {
        return findPayItems(this, 'EarningsRate', { payItemID: id })
    },
    getEarningsRates: function(options) {
        return findPayItems(this, 'EarningsRate', options)
    },
    /*Deduction Types*/
    newDeductionType: function(data, options) {
        return new DeductionType(this.application, data, options)
    },
    deleteDeductionType: function(id) {
        return deletePayItem(this, 'DeductionType', id)
    },
    getDeductionType: function(id) {
        return findPayItems(this, 'DeductionType', { payItemID: id })
    },
    getDeductionTypes: function(options) {
        return findPayItems(this, 'DeductionType', options)
    },
    /*Reimbursement Types*/
    newReimbursementType: function(data, options) {
        return new ReimbursementType(this.application, data, options)
    },
    deleteReimbursementType: function(id) {
        return deletePayItem(this, 'ReimbursementType', id)
    },
    getReimbursementType: function(id) {
        return findPayItems(this, 'ReimbursementType', { payItemID: id })
    },
    getReimbursementTypes: function(options) {
        return findPayItems(this, 'ReimbursementType', options)
    },
    /*Leave Types*/
    newLeaveType: function(data, options) {
        return new LeaveType(this.application, data, options)
    },
    deleteLeaveType: function(id) {
        return deletePayItem(this, 'LeaveType', id)
    },
    getLeaveType: function(id) {
        return findPayItems(this, 'LeaveType', { payItemID: id })
    },
    getLeaveTypes: function(options) {
        return findPayItems(this, 'LeaveType', options)
    },
    getPayItems: function(options) {
        var self = this;
        var clonedOptions = Object.assign({}, options, { api: 'payroll' });
        clonedOptions.entityConstructor = function(data) { return self.newPayItems(data) };
        return this.getEntities(clonedOptions)
    }
})

function findPayItems(obj, objType, options) {

    options = options || {};
    if (options.id) {
        options.payItemID = options.id
        delete options.id
    }

    return obj.getPayItems(options)
        .then(function(payItems) {
            if (options && options.payItemID) {
                let array = payItems[0][`${objType}s`].toArray()
                let data = {}
                data[`${objType}ID`] = options.payItemID
                return _.find(array, data)
            } else {
                return payItems[0][`${objType}s`]
            }
        })
}

function deletePayItem(obj, objType, id) {
    var self = obj;
    return self[`get${objType}s`]()
        .then(function(payItems) {
            let array = payItems.toArray();
            let data = {}
            data[`${objType}ID`] = id
            let found = _.find(array, data)

            if (found) {
                //Convert the JSON into a PayItem object so it can be deleted.
                return self[`new${objType}`](found).delete()
            } else {
                return Promise.reject('ID not found.')
            }
        })
}

module.exports = PayItems;