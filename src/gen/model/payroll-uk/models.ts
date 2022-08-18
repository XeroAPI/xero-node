export * from '././account';
export * from '././accounts';
export * from '././address';
export * from '././bankAccount';
export * from '././benefit';
export * from '././benefitLine';
export * from '././benefitObject';
export * from '././benefits';
export * from '././courtOrderLine';
export * from '././deduction';
export * from '././deductionLine';
export * from '././deductionObject';
export * from '././deductions';
export * from '././earningsLine';
export * from '././earningsOrder';
export * from '././earningsOrderObject';
export * from '././earningsOrders';
export * from '././earningsRate';
export * from '././earningsRateObject';
export * from '././earningsRates';
export * from '././earningsTemplate';
export * from '././earningsTemplateObject';
export * from '././employee';
export * from '././employeeLeave';
export * from '././employeeLeaveBalance';
export * from '././employeeLeaveBalances';
export * from '././employeeLeaveObject';
export * from '././employeeLeaveType';
export * from '././employeeLeaveTypeObject';
export * from '././employeeLeaveTypes';
export * from '././employeeLeaves';
export * from '././employeeObject';
export * from '././employeeOpeningBalances';
export * from '././employeeOpeningBalancesObject';
export * from '././employeePayTemplate';
export * from '././employeePayTemplateObject';
export * from '././employeePayTemplates';
export * from '././employeeStatutoryLeaveBalance';
export * from '././employeeStatutoryLeaveBalanceObject';
export * from '././employeeStatutoryLeaveSummary';
export * from '././employeeStatutoryLeavesSummaries';
export * from '././employeeStatutorySickLeave';
export * from '././employeeStatutorySickLeaveObject';
export * from '././employeeStatutorySickLeaves';
export * from '././employeeTax';
export * from '././employeeTaxObject';
export * from '././employees';
export * from '././employment';
export * from '././employmentObject';
export * from '././invalidField';
export * from '././leaveAccrualLine';
export * from '././leaveEarningsLine';
export * from '././leavePeriod';
export * from '././leavePeriods';
export * from '././leaveType';
export * from '././leaveTypeObject';
export * from '././leaveTypes';
export * from '././pagination';
export * from '././payRun';
export * from '././payRunCalendar';
export * from '././payRunCalendarObject';
export * from '././payRunCalendars';
export * from '././payRunObject';
export * from '././payRuns';
export * from '././paymentLine';
export * from '././paymentMethod';
export * from '././paymentMethodObject';
export * from '././payslip';
export * from '././payslipObject';
export * from '././payslips';
export * from '././problem';
export * from '././reimbursement';
export * from '././reimbursementLine';
export * from '././reimbursementObject';
export * from '././reimbursements';
export * from '././salaryAndWage';
export * from '././salaryAndWageObject';
export * from '././salaryAndWages';
export * from '././settings';
export * from '././statutoryDeduction';
export * from '././statutoryDeductionCategory';
export * from '././taxLine';
export * from '././timesheet';
export * from '././timesheetEarningsLine';
export * from '././timesheetLine';
export * from '././timesheetLineObject';
export * from '././timesheetObject';
export * from '././timesheets';
export * from '././trackingCategories';
export * from '././trackingCategory';

import localVarRequest = require('request');

import { Account } from '././account';
import { Accounts } from '././accounts';
import { Address } from '././address';
import { BankAccount } from '././bankAccount';
import { Benefit } from '././benefit';
import { BenefitLine } from '././benefitLine';
import { BenefitObject } from '././benefitObject';
import { Benefits } from '././benefits';
import { CourtOrderLine } from '././courtOrderLine';
import { Deduction } from '././deduction';
import { DeductionLine } from '././deductionLine';
import { DeductionObject } from '././deductionObject';
import { Deductions } from '././deductions';
import { EarningsLine } from '././earningsLine';
import { EarningsOrder } from '././earningsOrder';
import { EarningsOrderObject } from '././earningsOrderObject';
import { EarningsOrders } from '././earningsOrders';
import { EarningsRate } from '././earningsRate';
import { EarningsRateObject } from '././earningsRateObject';
import { EarningsRates } from '././earningsRates';
import { EarningsTemplate } from '././earningsTemplate';
import { EarningsTemplateObject } from '././earningsTemplateObject';
import { Employee } from '././employee';
import { EmployeeLeave } from '././employeeLeave';
import { EmployeeLeaveBalance } from '././employeeLeaveBalance';
import { EmployeeLeaveBalances } from '././employeeLeaveBalances';
import { EmployeeLeaveObject } from '././employeeLeaveObject';
import { EmployeeLeaveType } from '././employeeLeaveType';
import { EmployeeLeaveTypeObject } from '././employeeLeaveTypeObject';
import { EmployeeLeaveTypes } from '././employeeLeaveTypes';
import { EmployeeLeaves } from '././employeeLeaves';
import { EmployeeObject } from '././employeeObject';
import { EmployeeOpeningBalances } from '././employeeOpeningBalances';
import { EmployeeOpeningBalancesObject } from '././employeeOpeningBalancesObject';
import { EmployeePayTemplate } from '././employeePayTemplate';
import { EmployeePayTemplateObject } from '././employeePayTemplateObject';
import { EmployeePayTemplates } from '././employeePayTemplates';
import { EmployeeStatutoryLeaveBalance } from '././employeeStatutoryLeaveBalance';
import { EmployeeStatutoryLeaveBalanceObject } from '././employeeStatutoryLeaveBalanceObject';
import { EmployeeStatutoryLeaveSummary } from '././employeeStatutoryLeaveSummary';
import { EmployeeStatutoryLeavesSummaries } from '././employeeStatutoryLeavesSummaries';
import { EmployeeStatutorySickLeave } from '././employeeStatutorySickLeave';
import { EmployeeStatutorySickLeaveObject } from '././employeeStatutorySickLeaveObject';
import { EmployeeStatutorySickLeaves } from '././employeeStatutorySickLeaves';
import { EmployeeTax } from '././employeeTax';
import { EmployeeTaxObject } from '././employeeTaxObject';
import { Employees } from '././employees';
import { Employment } from '././employment';
import { EmploymentObject } from '././employmentObject';
import { InvalidField } from '././invalidField';
import { LeaveAccrualLine } from '././leaveAccrualLine';
import { LeaveEarningsLine } from '././leaveEarningsLine';
import { LeavePeriod } from '././leavePeriod';
import { LeavePeriods } from '././leavePeriods';
import { LeaveType } from '././leaveType';
import { LeaveTypeObject } from '././leaveTypeObject';
import { LeaveTypes } from '././leaveTypes';
import { Pagination } from '././pagination';
import { PayRun } from '././payRun';
import { PayRunCalendar } from '././payRunCalendar';
import { PayRunCalendarObject } from '././payRunCalendarObject';
import { PayRunCalendars } from '././payRunCalendars';
import { PayRunObject } from '././payRunObject';
import { PayRuns } from '././payRuns';
import { PaymentLine } from '././paymentLine';
import { PaymentMethod } from '././paymentMethod';
import { PaymentMethodObject } from '././paymentMethodObject';
import { Payslip } from '././payslip';
import { PayslipObject } from '././payslipObject';
import { Payslips } from '././payslips';
import { Problem } from '././problem';
import { Reimbursement } from '././reimbursement';
import { ReimbursementLine } from '././reimbursementLine';
import { ReimbursementObject } from '././reimbursementObject';
import { Reimbursements } from '././reimbursements';
import { SalaryAndWage } from '././salaryAndWage';
import { SalaryAndWageObject } from '././salaryAndWageObject';
import { SalaryAndWages } from '././salaryAndWages';
import { Settings } from '././settings';
import { StatutoryDeduction } from '././statutoryDeduction';
import { StatutoryDeductionCategory } from '././statutoryDeductionCategory';
import { TaxLine } from '././taxLine';
import { Timesheet } from '././timesheet';
import { TimesheetEarningsLine } from '././timesheetEarningsLine';
import { TimesheetLine } from '././timesheetLine';
import { TimesheetLineObject } from '././timesheetLineObject';
import { TimesheetObject } from '././timesheetObject';
import { Timesheets } from '././timesheets';
import { TrackingCategories } from '././trackingCategories';
import { TrackingCategory } from '././trackingCategory';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];
                 
let enumsMap: {[index: string]: any} = {
        "Account.TypeEnum": Account.TypeEnum,
        "Benefit.CategoryEnum": Benefit.CategoryEnum,
        "Benefit.CalculationTypeEnum": Benefit.CalculationTypeEnum,
        "Deduction.DeductionCategoryEnum": Deduction.DeductionCategoryEnum,
        "Deduction.CalculationTypeEnum": Deduction.CalculationTypeEnum,
        "EarningsRate.EarningsTypeEnum": EarningsRate.EarningsTypeEnum,
        "EarningsRate.RateTypeEnum": EarningsRate.RateTypeEnum,
        "Employee.GenderEnum": Employee.GenderEnum,
        "EmployeeLeaveType.ScheduleOfAccrualEnum": EmployeeLeaveType.ScheduleOfAccrualEnum,
        "EmployeeStatutoryLeaveBalance.LeaveTypeEnum": EmployeeStatutoryLeaveBalance.LeaveTypeEnum,
        "EmployeeStatutoryLeaveBalance.UnitsEnum": EmployeeStatutoryLeaveBalance.UnitsEnum,
        "EmployeeStatutoryLeaveSummary.TypeEnum": EmployeeStatutoryLeaveSummary.TypeEnum,
        "EmployeeStatutoryLeaveSummary.StatusEnum": EmployeeStatutoryLeaveSummary.StatusEnum,
        "EmployeeStatutorySickLeave.EntitlementFailureReasonsEnum": EmployeeStatutorySickLeave.EntitlementFailureReasonsEnum,
        "Employment.NiCategoryEnum": Employment.NiCategoryEnum,
        "LeavePeriod.PeriodStatusEnum": LeavePeriod.PeriodStatusEnum,
        "PayRun.PayRunStatusEnum": PayRun.PayRunStatusEnum,
        "PayRun.PayRunTypeEnum": PayRun.PayRunTypeEnum,
        "PayRun.CalendarTypeEnum": PayRun.CalendarTypeEnum,
        "PayRunCalendar.CalendarTypeEnum": PayRunCalendar.CalendarTypeEnum,
        "PaymentMethod.PaymentMethodEnum": PaymentMethod.PaymentMethodEnum,
        "Payslip.PaymentMethodEnum": Payslip.PaymentMethodEnum,
        "SalaryAndWage.StatusEnum": SalaryAndWage.StatusEnum,
        "SalaryAndWage.PaymentTypeEnum": SalaryAndWage.PaymentTypeEnum,
        "StatutoryDeductionCategory": StatutoryDeductionCategory,
        "Timesheet.StatusEnum": Timesheet.StatusEnum,
}

let typeMap: {[index: string]: any} = {
    "Account": Account,
    "Accounts": Accounts,
    "Address": Address,
    "BankAccount": BankAccount,
    "Benefit": Benefit,
    "BenefitLine": BenefitLine,
    "BenefitObject": BenefitObject,
    "Benefits": Benefits,
    "CourtOrderLine": CourtOrderLine,
    "Deduction": Deduction,
    "DeductionLine": DeductionLine,
    "DeductionObject": DeductionObject,
    "Deductions": Deductions,
    "EarningsLine": EarningsLine,
    "EarningsOrder": EarningsOrder,
    "EarningsOrderObject": EarningsOrderObject,
    "EarningsOrders": EarningsOrders,
    "EarningsRate": EarningsRate,
    "EarningsRateObject": EarningsRateObject,
    "EarningsRates": EarningsRates,
    "EarningsTemplate": EarningsTemplate,
    "EarningsTemplateObject": EarningsTemplateObject,
    "Employee": Employee,
    "EmployeeLeave": EmployeeLeave,
    "EmployeeLeaveBalance": EmployeeLeaveBalance,
    "EmployeeLeaveBalances": EmployeeLeaveBalances,
    "EmployeeLeaveObject": EmployeeLeaveObject,
    "EmployeeLeaveType": EmployeeLeaveType,
    "EmployeeLeaveTypeObject": EmployeeLeaveTypeObject,
    "EmployeeLeaveTypes": EmployeeLeaveTypes,
    "EmployeeLeaves": EmployeeLeaves,
    "EmployeeObject": EmployeeObject,
    "EmployeeOpeningBalances": EmployeeOpeningBalances,
    "EmployeeOpeningBalancesObject": EmployeeOpeningBalancesObject,
    "EmployeePayTemplate": EmployeePayTemplate,
    "EmployeePayTemplateObject": EmployeePayTemplateObject,
    "EmployeePayTemplates": EmployeePayTemplates,
    "EmployeeStatutoryLeaveBalance": EmployeeStatutoryLeaveBalance,
    "EmployeeStatutoryLeaveBalanceObject": EmployeeStatutoryLeaveBalanceObject,
    "EmployeeStatutoryLeaveSummary": EmployeeStatutoryLeaveSummary,
    "EmployeeStatutoryLeavesSummaries": EmployeeStatutoryLeavesSummaries,
    "EmployeeStatutorySickLeave": EmployeeStatutorySickLeave,
    "EmployeeStatutorySickLeaveObject": EmployeeStatutorySickLeaveObject,
    "EmployeeStatutorySickLeaves": EmployeeStatutorySickLeaves,
    "EmployeeTax": EmployeeTax,
    "EmployeeTaxObject": EmployeeTaxObject,
    "Employees": Employees,
    "Employment": Employment,
    "EmploymentObject": EmploymentObject,
    "InvalidField": InvalidField,
    "LeaveAccrualLine": LeaveAccrualLine,
    "LeaveEarningsLine": LeaveEarningsLine,
    "LeavePeriod": LeavePeriod,
    "LeavePeriods": LeavePeriods,
    "LeaveType": LeaveType,
    "LeaveTypeObject": LeaveTypeObject,
    "LeaveTypes": LeaveTypes,
    "Pagination": Pagination,
    "PayRun": PayRun,
    "PayRunCalendar": PayRunCalendar,
    "PayRunCalendarObject": PayRunCalendarObject,
    "PayRunCalendars": PayRunCalendars,
    "PayRunObject": PayRunObject,
    "PayRuns": PayRuns,
    "PaymentLine": PaymentLine,
    "PaymentMethod": PaymentMethod,
    "PaymentMethodObject": PaymentMethodObject,
    "Payslip": Payslip,
    "PayslipObject": PayslipObject,
    "Payslips": Payslips,
    "Problem": Problem,
    "Reimbursement": Reimbursement,
    "ReimbursementLine": ReimbursementLine,
    "ReimbursementObject": ReimbursementObject,
    "Reimbursements": Reimbursements,
    "SalaryAndWage": SalaryAndWage,
    "SalaryAndWageObject": SalaryAndWageObject,
    "SalaryAndWages": SalaryAndWages,
    "Settings": Settings,
    "StatutoryDeduction": StatutoryDeduction,
    "TaxLine": TaxLine,
    "Timesheet": Timesheet,
    "TimesheetEarningsLine": TimesheetEarningsLine,
    "TimesheetLine": TimesheetLine,
    "TimesheetLineObject": TimesheetLineObject,
    "TimesheetObject": TimesheetObject,
    "Timesheets": Timesheets,
    "TrackingCategories": TrackingCategories,
    "TrackingCategory": TrackingCategory,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let [index, date] of Object.entries(data)) {                  
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            if(subType === 'string') {
                return transformedData.join(',')
            } else {
                return transformedData
            }
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }
            
            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let [index, attributeType] of Object.entries(attributeTypes)) {
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserializeDateFormats(type: string, data: any) {
        const isDate = new Date(data)
        if (isNaN(isDate.getTime())) {
            const re = /-?\d+/;
            const m = re.exec(data);
            return new Date(parseInt(m[0], 10));
        } else {
            return isDate
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            if (type === "string" && data.toString().substring(0, 6) === "/Date(") {
                return this.deserializeDateFormats(type, data) // For MS dates that are of type 'string'
            }
            else {
                return data;
            }
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            // Asset API returns string even for Array<Model>
            const dataFormatted = typeof data == 'string' ? JSON.parse(data) : data
            for (let index in dataFormatted) {
                let currentData = dataFormatted[index];
                transformedData.push(ObjectSerializer.deserialize(currentData, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return this.deserializeDateFormats(type, data)
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}