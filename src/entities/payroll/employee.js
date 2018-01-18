var _ = require('lodash'),
    Entity = require('../entity'),
    ExternalLinkSchema = require('../shared').ExternalLinkSchema

/**
 * Address Section
 */

var AddressSchema = Entity.SchemaObject({
    AddressLine1: { type: String, toObject: 'hasValue' },
    AddressLine2: { type: String, toObject: 'hasValue' },
    City: { type: String, toObject: 'hasValue' },
    Region: { type: String, toObject: 'hasValue' },
    PostalCode: { type: String, toObject: 'hasValue' },
    Country: { type: String, toObject: 'hasValue' }
});

/**
 * Bank Account Section
 */

var BankAccountSchema = Entity.SchemaObject({
    StatementText: { type: String, toObject: 'hasValue' },
    AccountName: { type: String, toObject: 'hasValue' },
    BSB: { type: String, toObject: 'hasValue' },
    AccountNumber: { type: String, toObject: 'hasValue' },
    Amount: { type: Number, toObject: 'hasValue' },
    Remainder: { type: Boolean, toObject: 'hasValue' }
});

/**
 * Pay Template Section
 */

var EarningsLineSchema = Entity.SchemaObject({
    EarningsRateID: { type: String, toObject: 'always' },
    CalculationType: { type: String, toObject: 'always' },
    AnnualSalary: { type: Number, toObject: 'always' },
    RatePerUnit: { type: Number, toObject: 'hasValue' },
    NormalNumberOfUnits: { type: String, toObject: 'hasValue' },
    NumberOfUnitsPerWeek: { type: Number, toObject: 'hasValue' }
});

var DeductionLineSchema = Entity.SchemaObject({
    DeductionTypeID: { type: String, toObject: 'always' },
    CalculationType: { type: String, toObject: 'always' },
    Percentage: { type: String, toObject: 'always' },
    Amount: { type: Number, toObject: 'always' }
});

var SuperLineSchema = Entity.SchemaObject({
    SuperMembershipID: { type: String, toObject: 'always' },
    ContributionType: { type: String, toObject: 'always' },
    CalculationType: { type: String, toObject: 'always' },
    ExpenseAccountCode: { type: String, toObject: 'always' },
    LiabilityAccountCode: { type: String, toObject: 'always' },
    MinimumMonthlyEarnings: { type: String, toObject: 'always' },
    Percentage: { type: String, toObject: 'always' }
});

var ReimbursementLineSchema = Entity.SchemaObject({
    ReimbursementTypeID: { type: String, toObject: 'always' },
    Description: { type: String, toObject: 'always' },
    Amount: { type: Number, toObject: 'always' }
});

var LeaveLineSchema = Entity.SchemaObject({
    LeaveTypeID: { type: String, toObject: 'always' },
    CalculationType: { type: String, toObject: 'always' },
    AnnualNumberOfUnits: { type: Number, toObject: 'always' },
    FullTimeNumberOfUnitsPerPeriod: { type: Number, toObject: 'always' },
    NumberOfUnits: { type: Number, toObject: 'always' },
    EntitlementFinalPayPayoutType: { type: String, toObject: 'hasValue' }
});

var PayTemplateSchema = Entity.SchemaObject({
    EarningsLines: { type: Array, arrayType: EarningsLineSchema, toObject: 'always' },
    DeductionLines: { type: Array, arrayType: DeductionLineSchema, toObject: 'always' },
    ReimbursementLines: { type: Array, arrayType: ReimbursementLineSchema, toObject: 'always' },
    SuperLines: { type: Array, arrayType: SuperLineSchema, toObject: 'always' },
    LeaveLines: { type: Array, arrayType: LeaveLineSchema, toObject: 'always' }
});

/**
 * Opening Balance Section
 */


var PaymentMethodSchema = Entity.SchemaObject({
    PaymentMethodType: { type: String },
    BankAccounts: { type: Array, arrayType: BankAccountSchema, toObject: 'always' }
});

var OpeningBalanceEarningsLineSchema = Entity.SchemaObject({
    EarningsRateID: { type: String, toObject: 'always' },
    Amount: { type: Number, toObject: 'always' }
});
var OpeningBalanceDeductionLineSchema = Entity.SchemaObject({
    DeductionTypeID: { type: String, toObject: 'always' },
    Amount: { type: Number, toObject: 'always' }
});
var OpeningBalanceSuperLineSchema = Entity.SchemaObject({
    SuperMembershipID: { type: String, toObject: 'always' },
    CalculationType: { type: String, toObject: 'always' },
    Amount: { type: Number, toObject: 'always' }
});
var OpeningBalanceReimbursementLineSchema = Entity.SchemaObject({
    ReimbursementTypeID: { type: String, toObject: 'always' },
    Amount: { type: Number, toObject: 'always' }
});
var OpeningBalanceLeaveLineSchema = Entity.SchemaObject({
    LeaveTypeID: { type: String, toObject: 'always' },
    NumberOfUnits: { type: Number, toObject: 'always' }
});

var OpeningBalancesSchema = Entity.SchemaObject({
    OpeningBalanceDate: { type: Date, toObject: 'always' },
    Tax: { type: String, toObject: 'always' },
    EarningsLines: { type: Array, arrayType: OpeningBalanceEarningsLineSchema, toObject: 'always' },
    DeductionLines: { type: Array, arrayType: OpeningBalanceDeductionLineSchema, toObject: 'always' },
    SuperLines: { type: Array, arrayType: OpeningBalanceSuperLineSchema, toObject: 'always' },
    ReimbursementLines: { type: Array, arrayType: OpeningBalanceReimbursementLineSchema, toObject: 'always' },
    LeaveLines: { type: Array, arrayType: OpeningBalanceLeaveLineSchema, toObject: 'always' },
});

/**
 * Leave Balances
 */

var LeaveBalancesSchema = Entity.SchemaObject({
    LeaveName: { type: String, toObject: 'always' },
    LeaveTypeID: { type: String, toObject: 'always' },
    NumberOfUnits: { type: Number, toObject: 'always' },
    TypeOfUnits: { type: String, toObject: 'always' }
});

/**
 * Super Memberships
 */

var SuperMembershipsSchema = Entity.SchemaObject({
    SuperFundID: { type: String, toObject: 'always' },
    EmployeeNumber: { type: String, toObject: 'always' },
    SuperMembershipID: { type: String, toObject: 'always' }
});

/**
 * Employee Schema
 */

var EmployeeSchema = Entity.SchemaObject({
    EmployeeID: { type: String, toObject: 'always' },
    FirstName: { type: String, toObject: 'always' },
    LastName: { type: String, toObject: 'always' },
    Status: { type: String, toObject: 'always' },
    Email: { type: String, toObject: 'hasValue' },
    DateOfBirth: { type: Date, toObject: 'hasValue' },
    HomeAddress: { type: AddressSchema, toObject: 'hasValue' },
    Title: { type: String, toObject: 'hasValue' },
    MiddleNames: { type: String, toObject: 'hasValue' },
    Gender: { type: String, toObject: 'hasValue' },
    Phone: { type: String, toObject: 'hasValue' },
    Mobile: { type: String, toObject: 'hasValue' },
    TwitterUserName: { type: String, toObject: 'hasValue' },
    IsAuthorisedToApproveTimeOff: { type: Boolean, toObject: 'hasValue' },
    IsAuthorisedToApproveTimesheets: { type: Boolean, toObject: 'hasValue' },
    JobTitle: { type: String, toObject: 'hasValue' },
    Classification: { type: String, toObject: 'hasValue' },
    OrdinaryEarningsRateID: { type: String, toObject: 'hasValue' },
    PayrollCalendarID: { type: String, toObject: 'hasValue' },
    EmployeeGroupName: { type: String, toObject: 'hasValue' },
    BankAccounts: [BankAccountSchema],
    PayTemplate: { type: PayTemplateSchema, toObject: 'always' },
    OpeningBalances: { type: Array, arrayType: OpeningBalancesSchema, toObject: 'always' },
    LeaveBalances: { type: Array, arrayType: LeaveBalancesSchema, toObject: 'always' },
    SuperMemberships: { type: Array, arrayType: SuperMembershipsSchema, toObject: 'always' },
    TerminationDate: { type: Date, toObject: 'hasValue' },
    UpdatedDateUTC: { type: Date, toObject: 'never' }
});


var Employee = Entity.extend(EmployeeSchema, {
    constructor: function(application, data, options) {
        logger.debug('Employee::constructor');
        this.Entity.call(this, application, data, options);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        return this._super(options);
    },
    _toObject: function(options) {
        return this._super(options);
    },
    save: function(options) {
        var path, method;
        if (this.EmployeeId) {
            path = 'Employees/' + this.EmployeeID;
            method = 'post'
        } else {
            path = 'Employees';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, JSON.stringify(self), { api: 'payroll' });
    }
});


module.exports.Employee = Employee;
module.exports.EmployeeSchema = EmployeeSchema;
