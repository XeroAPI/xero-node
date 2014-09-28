var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')
    , ExternalLinkSchema = require('./shared').ExternalLinkSchema

var EmployeeSchema = new Entity.SchemaObject({
    EmployeeID: { type: String },
    Status: { type: String },
    FirstName: { type: String },
    LastName: { type: String },
    ExternalLink: { type: ExternalLinkSchema}
});


var Employee = Entity.extend(EmployeeSchema, {
    constructor: function (application, data, options)
    {
        logger.debug('Employee::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function (data, options)
    {
    },
    changes: function (options)
    {
        return this._super(options);
    },
    _toObject: function (options)
    {
        return this._super(options);
    },
    fromXmlObj: function (obj)
    {
        /*var self = this;
        _.extend(self, _.omit(obj, 'Addresses', 'Phones', 'ContactPersons'));
        if (obj.Addresses) {
            var addresses = this.application.asArray(obj.Addresses.Address);
            _.each(addresses, function (address)
            {
                self.Addresses.push(address);
            })
        }
        if (obj.Phones) {
            var phones = this.application.asArray(obj.Phones.Phone);
            _.each(phones, function (phone)
            {
                self.Phones.push(phone);
            })
        }
        if (obj.ContactPersons) {
            var contactPersons = this.application.asArray(obj.ContactPersons.ContactPerson);
            _.each(contactPersons, function (contactPerson)
            {
                self.ContactPersons.push(contactPerson);
            })
        } */

        return this;
    },
    toXml: function ()
    {

    }
});


module.exports = Employee;
module.exports.EmployeeSchema = EmployeeSchema;
