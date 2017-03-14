var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    Employee = require('../entities/payroll_employee'),
    util = require('util')

var Employees = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'Employee', entityPlural: 'Employees' }, options));
    },
    newEmployee: function(data, options) {
        return new Employee(this.application, data, options)
    },
    getEmployee: function(id, modifiedAfter, where, order) {
        return this.getEmployees({ id: id, modifiedAfter: modifiedAfter, where: where, order: order })
            .then(function(employees) {
                return _.first(employees);
            })
    },
    saveEmployees: function(employees, options) {
        // TO-DO
        // return this.saveEntities(employees, options)
    },
    getEmployees: function(options) {
        var self = this;
        var clonedOptions = Object.assign({}, options, { api: 'payroll' });
        clonedOptions.entityConstructor = function(data) { return self.newEmployee(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Employees;
