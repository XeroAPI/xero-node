var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger'),
    ExternalLinkSchema = require('./shared').ExternalLinkSchema

var AddressSchema = new Entity.SchemaObject({
    StreetAddress: { type: String },
    SuiteOrAptOrUnit: { type: String },
    City: { type: String },
    State: { type: String },
    Zip: { type: String },
    Lattitude: { type: String },
    Longitude: { type: String }
});

var SalaryAndWageSchema = new Entity.SchemaObject({
    SalaryAndWageId: { type: String },
    EarningsTypeId: { type: String },
    SalaryWagesType: { type: String },
    HourlyRate: { type: Number },
    AnnualSalary: { type: Number },
    StandardHoursPerWeek: { type: Number }
});

var WorkLocationSchema = new Entity.SchemaObject({
    WorkLocationID: { type: String },
    IsPrimary: { type: Boolean }
});

var BankAccountSchema = new Entity.SchemaObject({
    AccountHolderName: { type: String },
    StatementText: { type: String },
    AccountType: { type: String },
    RoutingNumber: { type: String },
    AccountNumber: { type: String },
    Amount: { type: Number },
    Remainder: { type: Boolean }
});

var EarningsLineSchema = new Entity.SchemaObject({
    EarningsTypeID: { type: String },
    UnitsOrHours: { type: Number },
    RatePerUnit: { type: Number },
    Amount: { type: Number }
});

var DeductionLineSchema = new Entity.SchemaObject({
    DeductionTypeID: { type: String },
    CalculationType: { type: String },
    EmployeeMax: { type: Number },
    Percentage: { type: Number },
    Amount: { type: Number }
});

var ReimbursementLineSchema = new Entity.SchemaObject({
    ReimbursementTypeID: { type: String },
    Description: { type: String },
    Amount: { type: Number }
});

var BenefitLineSchema = new Entity.SchemaObject({
    BenefitTypeID: { type: String },
    CalculationType: { type: String },
    Amount: { type: Number }
});


var PayTemplateSchema = Entity.SchemaObject({
    EarningsLines: { type: Array, arrayType: EarningsLineSchema, toObject: 'always' },
    DeductionLines: { type: Array, arrayType: DeductionLineSchema, toObject: 'always' },
    ReimbursementLines: { type: Array, arrayType: ReimbursementLineSchema, toObject: 'always' },
    BenefitLines: { type: Array, arrayType: BenefitLineSchema, toObject: 'always' }
});
var PaymentMethodSchema = new Entity.SchemaObject({
    PaymentMethodType: { type: String },
    BankAccounts: { type: Array, arrayType: BankAccountSchema, toObject: 'always' }
});

var OpeningBalanceEarningsLineSchema = Entity.SchemaObject({
    EarningsTypeID: { type: String },
    Amount: { type: Number }
});
var OpeningBalanceBenefitLineSchema = Entity.SchemaObject({
    BenefitLineID: { type: String },
    Amount: { type: Number }
});
var OpeningBalanceDeductionLineSchema = Entity.SchemaObject({
    DeductionTypeID: { type: String },
    Amount: { type: Number }
});
var OpeningBalanceReimbursementLineSchema = Entity.SchemaObject({
    ReimbursementTypeID: { type: String },
    Amount: { type: Number }
});

var OpeningBalancesSchema = Entity.SchemaObject({
    EarningsLines: { type: Array, arrayType: OpeningBalanceEarningsLineSchema, toObject: 'always' },
    BenefitLines: { type: Array, arrayType: OpeningBalanceBenefitLineSchema, toObject: 'always' },
    DeductionLines: { type: Array, arrayType: OpeningBalanceDeductionLineSchema, toObject: 'always' },
    ReimbursementLines: { type: Array, arrayType: OpeningBalanceReimbursementLineSchema, toObject: 'always' }
});

var EmployeeSchema = new Entity.SchemaObject({
    EmployeeID: { type: String },
    Status: { type: String },
    UpdatedDateUTC: { type: Date },
    FirstName: { type: String },
    LastName: { type: String },
    DateOfBirth: { type: String },
    HomeAddress: { type: AddressSchema },
    MiddleNames: { type: String },
    JobTitle: { type: String },
    Email: { type: String },
    Gender: { type: String },
    MailingAddress: { type: AddressSchema },
    Phone: { type: String },
    EmployeeNumber: { type: String },
    SocialSecurityNumber: { type: String },
    StartDate: { type: String },
    PayScheduleID: { type: String },
    EmployeeGroupName: { type: String },
    EmploymentBasis: { type: String },
    HolidayGroupID: { type: String },
    IsAuthorisedToApproveTimeOff: { type: Boolean },
    IsAuthorisedToApproveTimesheets: { type: Boolean },
    SalaryAndWages: { type: Array, arrayType: SalaryAndWageSchema, toObject: 'always' },
    WorkLocations: { type: Array, arrayType: WorkLocationSchema, toObject: 'always' },
    PaymentMethod: { type: PaymentMethodSchema, toObject: 'always' },
    PayTemplate: { type: PayTemplateSchema, toObject: 'always' },
    OpeningBalances: { type: Array, arrayType: OpeningBalancesSchema, toObject: 'always' }
});

var entityName = 'Employee';
var Employee = Entity.extend(EmployeeSchema, {
    constructor: function(application, data, options) {
        logger.debug('Employee::constructor');
        this.Entity.call(this, application, data, options);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this._super(options);
    },
    _toObject: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this._super(options);
    },
    fromXmlObj: function(obj) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        Object.assign(self, _.omit(obj, 'SalaryAndWages', 'WorkLocations', 'PaymentMethod', 'PayTemplate', 'OpeningBalances'));
        if (obj.SalaryAndWages)
            this.extractArray(obj.SalaryAndWages.SalaryAndWage, this.SalaryAndWages);
        if (obj.WorkLocations)
            this.extractArray(obj.WorkLocations.WorkLocation, this.WorkLocations);

        if (obj.PaymentMethod) {
            Object.assign(this.PaymentMethod, _.pick(obj.PaymentMethod, 'PaymentMethodType'));
            if (obj.PaymentMethod.BankAccounts)
                this.extractArray(obj.PaymentMethod.BankAccounts, this.PaymentMethod.BankAccounts);
        }
        if (obj.PayTemplate) {
            if (obj.PayTemplate.EarningsLines)
                this.extractArray(obj.PayTemplate.EarningsLines.EarningsLine, this.PayTemplate.EarningsLines);
            if (obj.PayTemplate.BenefitLines)
                this.extractArray(obj.PayTemplate.BenefitLines.BenefitLine, this.PayTemplate.BenefitLines);
            if (obj.PayTemplate.DeductionLines)
                this.extractArray(obj.PayTemplate.DeductionLines.DeductionLine, this.PayTemplate.DeductionLines);
            if (obj.PayTemplate.ReimbursementLines)
                this.extractArray(obj.PayTemplate.ReimbursementLines.ReimbursementLine, this.PayTemplate.ReimbursementLines);
        }
        if (obj.OpeningBalances) {
            if (obj.OpeningBalances.EarningsLines)
                this.extractArray(obj.OpeningBalances.EarningsLines.EarningsLine, this.OpeningBalances.EarningsLines);
            if (obj.OpeningBalances.BenefitLines)
                this.extractArray(obj.OpeningBalances.BenefitLines.BenefitLine, this.OpeningBalances.BenefitLines);
            if (obj.OpeningBalances.DeductionLines)
                this.extractArray(obj.OpeningBalances.DeductionLines.DeductionLine, this.OpeningBalances.DeductionLines);
            if (obj.OpeningBalances.ReimbursementLines)
                this.extractArray(obj.OpeningBalances.ReimbursementLines.ReimbursementLine, this.OpeningBalances.ReimbursementLines);
        }

        return this;
    },
    toXml: function() {
        this.trackEvent(entityName, arguments.callee.name);
        // TO-DO
        var employee = _.omit(this.toObject());
        return this.application.js2xml(employee, 'Employee');
    },
    save: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var xml = '<Employees>' + this.toXml() + '</Employees>';
        var path, method;
        if (this.EmployeeId) {
            path = 'Employees/' + this.EmployeeID;
            method = 'post'
        } else {
            path = 'Employees';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, xml, { api: 'payroll' });
    }
});


module.exports = Employee;
module.exports.EmployeeSchema = EmployeeSchema;