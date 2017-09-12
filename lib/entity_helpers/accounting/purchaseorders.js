'use strict';

const _ = require('lodash');
const EntityHelper = require('../entity_helper');
const PurchaseOrder = require('../../entities/accounting/purchaseorder').PurchaseOrder;

const PurchaseOrders = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'PurchaseOrders' }, options)
    );
  },
  newPurchaseOrder: function(data, options) {
    return new PurchaseOrder(this.application, data, options);
  },
  getPurchaseOrders: function(options) {
    return this.getEntities(this.setUpOptions(options));
  },
  getPurchaseOrder: function(id) {
    return this.getPurchaseOrders({ id }).then(purchaseOrders =>
      _.first(purchaseOrders)
    );
  },
  savePurchaseOrders: function(purchaseOrders, options) {
    return this.saveEntities(purchaseOrders, this.setUpOptions(options));
  },
  setUpOptions: function(options) {
    const self = this;
    const clonedOptions = _.clone(options || {});
    clonedOptions.entityPath = 'PurchaseOrders';
    clonedOptions.entityConstructor = data => self.newPurchaseOrder(data);
    return clonedOptions;
  },
});

module.exports = PurchaseOrders;
