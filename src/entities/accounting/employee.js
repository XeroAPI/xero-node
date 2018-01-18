'use strict';

const _ = require('lodash');
const Entity = require('../entity');

const ExternalLink = Entity.SchemaObject({
  Url: { type: String, toObject: 'always' },
  Description: { type: String, toObject: 'hasValue' },
});

const EmployeeSchema = Entity.SchemaObject({
  EmployeeID: { type: String, toObject: 'always' },
  Status: { type: String, toObject: 'always' },
  FirstName: { type: String, toObject: 'always' },
  LastName: { type: String, toObject: 'always' },
  ExternalLink: { type: ExternalLink, toObject: 'always' },
});

const Employee = Entity.extend(EmployeeSchema, {
  constructor: function(...args) {
    this.Entity.apply(this, args);
  },
  save: function() {
    const self = this;
    let path = '';
    let method = '';

    if (this.EmployeeID) {
      path = `Employees/${this.EmployeeID}`;
      method = 'post';
    } else {
      path = 'Employees';
      method = 'put';
    }

    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(self),
      {
        entityPath: 'Employees',
        entityConstructor: data =>
          self.application.core.employees.newEmployee(data),
      }
    );
  },
});

module.exports.Employee = Employee;
module.exports.EmployeeSchema = EmployeeSchema;
