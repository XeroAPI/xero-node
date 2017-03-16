var _ = require('lodash'),
    logger = require('./logger')

var HELPERS = {
    organisations: { file: 'organisations' },
    contacts: { file: 'contacts' },
    items: { file: 'items' },
    bankTransactions: { file: 'banktransactions' },
    bankTransfers: { file: 'banktransfers' },
    brandingThemes: { file: 'brandingthemes' },
    currencies: { file: 'currencies' },
    journals: { file: 'journals' },
    attachments: { file: 'attachments' },
    accounts: { file: 'accounts' },
    invoices: { file: 'invoices' },
    trackingCategories: { file: 'trackingcategories' },
    users: { file: 'users' },
    payments: { file: 'payments' },
    taxRates: { file: 'taxrates' },
    reports: { file: 'reports' }
};

function Core(application, options) {
    var self = this;
    logger.debug('Core::constructor');
    this._application = application;

    _.each(HELPERS, function(entityHelper, id) {
        var instance = new(require('./entity_helpers/accounting/' + entityHelper.file))(application);
        Object.defineProperty(self, id, {
            get: function() { return instance }
        })
    })
}

// Static
Object.assign(Core, {

})

// Instance
Object.assign(Core.prototype, {


})

module.exports = Core;