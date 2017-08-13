var _ = require('lodash')

var HELPERS = {
    timesheets: { file: 'timesheets' },
    payitems: { file: 'payitems' },
    employees: { file: 'employees' }
};

function Payroll(application, options) {
    var self = this;
    
    this._application = application;

    _.each(HELPERS, function(entityHelper, id) {
        var instance = new(require('./entity_helpers/payroll/' + entityHelper.file))(application);
        Object.defineProperty(self, id, {
            get: function() { return instance }
        })
    })
}

// Static
Object.assign(Payroll, {

})

// Instance
Object.assign(Payroll.prototype, {


})

module.exports = Payroll;