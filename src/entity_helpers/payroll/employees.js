var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    Employee = require('../../entities/payroll/employee').Employee,
    util = require('util')

var Employees = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'Employees' }, options));
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
        return this.saveEntities(employees, this.setUpOptions(options));
    },
    getEmployees: function(options) {
        var self = this;
        var clonedOptions = Object.assign({}, options, { api: 'payroll' });
        clonedOptions.entityPath = 'Employees.Employee';
        clonedOptions.entityConstructor = function(data) { return self.newEmployee(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Employees;