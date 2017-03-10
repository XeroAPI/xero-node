var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    Employee = require('../entities/payroll_employee'),
    util = require('util')

var entityName = 'EmployeesHelper';
var Employees = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'Employee', entityPlural: 'Employees' }, options));
    },
    newEmployee: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new Employee(this.application, data, options)
    },
    getEmployee: function(id, modifiedAfter, where, order) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getEmployees({ id: id, modifiedAfter: modifiedAfter, where: where, order: order })
            .then(function(employees) {
                return _.first(employees);
            })
    },
    saveEmployees: function(employees, options) {
        this.trackEvent(entityName, arguments.callee.name);
        // TO-DO
        // return this.saveEntities(employees, options)
    },
    getEmployees: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = Object.assign({}, options, { api: 'payroll' });
        clonedOptions.entityConstructor = function(data) { return self.newEmployee(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Employees;