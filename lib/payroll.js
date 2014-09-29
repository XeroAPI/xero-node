var _ = require('lodash')
    , logger = require('./logger')

var HELPERS = {
    timesheets: { file: 'timesheets'},
    payitems: { file: 'payitems'},
    employees: { file: 'payroll_employees'}
};

function Payroll(application, options)
{
    var self = this;
    logger.debug('Payroll::constructor');
    this._application = application;

    _.each(HELPERS, function(entityHelper, id)
    {
        var instance = new (require('./entity_helpers/' + entityHelper.file))(application);
        Object.defineProperty(self, id,  {
            get: function() { return instance }
        })
    })
}

// Static
_.extend(Payroll, {

})

// Instance
_.extend(Payroll.prototype, {


})

module.exports = Payroll;