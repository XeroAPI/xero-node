'use strict';

const _ = require('lodash');
const EntityHelper = require('../entity_helper');
const Employee = require('../../entities/accounting/employee').Employee;

const Employees = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'Employees' }, options)
    );
  },
  newEmployee: function(data, options) {
    return new Employee(this.application, data, options);
  },
  getEmployees: function(options) {
    return this.getEntities(this.setUpOptions(options));
  },
  getEmployee: function(id) {
    return this.getEmployees({ id }).then(employees => _.first(employees));
  },
  saveEmployees: function(employees, options) {
    return this.saveEntities(employees, this.setUpOptions(options));
  },
  setUpOptions: function(options) {
    const self = this;
    const clonedOptions = _.clone(options || {});
    clonedOptions.entityPath = 'Employees';
    clonedOptions.entityConstructor = data => self.newEmployee(data);
    return clonedOptions;
  },
});

module.exports = Employees;
