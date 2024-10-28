export * from '././aPIException';
export * from '././account';
export * from '././accountType';
export * from '././allowanceCategory';
export * from '././allowanceType';
export * from '././bankAccount';
export * from '././calendarType';
export * from '././countryOfResidence';
export * from '././deductionLine';
export * from '././deductionType';
export * from '././deductionTypeCalculationType';
export * from '././earningsLine';
export * from '././earningsRate';
export * from '././earningsRateCalculationType';
export * from '././earningsType';
export * from '././employee';
export * from '././employeeStatus';
export * from '././employees';
export * from '././employmentBasis';
export * from '././employmentTerminationPaymentType';
export * from '././employmentType';
export * from '././entitlementFinalPayPayoutType';
export * from '././homeAddress';
export * from '././incomeType';
export * from '././leaveAccrualLine';
export * from '././leaveApplication';
export * from '././leaveApplications';
export * from '././leaveBalance';
export * from '././leaveCategoryCode';
export * from '././leaveEarningsLine';
export * from '././leaveLine';
export * from '././leaveLineCalculationType';
export * from '././leaveLines';
export * from '././leavePeriod';
export * from '././leavePeriodStatus';
export * from '././leaveType';
export * from '././leaveTypeContributionType';
export * from '././manualTaxType';
export * from '././openingBalances';
export * from '././paidLeaveEarningsLine';
export * from '././payItem';
export * from '././payItems';
export * from '././payOutType';
export * from '././payRun';
export * from '././payRunStatus';
export * from '././payRuns';
export * from '././payTemplate';
export * from '././paymentFrequencyType';
export * from '././payrollCalendar';
export * from '././payrollCalendars';
export * from '././payslip';
export * from '././payslipLines';
export * from '././payslipObject';
export * from '././payslipSummary';
export * from '././payslips';
export * from '././rateType';
export * from '././reimbursementLine';
export * from '././reimbursementLines';
export * from '././reimbursementType';
export * from '././residencyStatus';
export * from '././seniorMaritalStatus';
export * from '././settings';
export * from '././settingsObject';
export * from '././settingsTrackingCategories';
export * from '././settingsTrackingCategoriesEmployeeGroups';
export * from '././settingsTrackingCategoriesTimesheetCategories';
export * from '././state';
export * from '././superFund';
export * from '././superFundProduct';
export * from '././superFundProducts';
export * from '././superFundType';
export * from '././superFunds';
export * from '././superLine';
export * from '././superMembership';
export * from '././superannuationCalculationType';
export * from '././superannuationContributionType';
export * from '././superannuationLine';
export * from '././tFNExemptionType';
export * from '././taxDeclaration';
export * from '././taxLine';
export * from '././taxScaleType';
export * from '././timesheet';
export * from '././timesheetLine';
export * from '././timesheetObject';
export * from '././timesheetStatus';
export * from '././timesheets';
export * from '././validationError';
export * from '././workCondition';
import { AxiosRequestConfig } from 'axios';
import { APIException } from '././aPIException';
import { Account } from '././account';
import { AccountType } from '././accountType';
import { AllowanceCategory } from '././allowanceCategory';
import { AllowanceType } from '././allowanceType';
import { BankAccount } from '././bankAccount';
import { CalendarType } from '././calendarType';
import { CountryOfResidence } from '././countryOfResidence';
import { DeductionLine } from '././deductionLine';
import { DeductionType } from '././deductionType';
import { DeductionTypeCalculationType } from '././deductionTypeCalculationType';
import { EarningsLine } from '././earningsLine';
import { EarningsRate } from '././earningsRate';
import { EarningsRateCalculationType } from '././earningsRateCalculationType';
import { EarningsType } from '././earningsType';
import { Employee } from '././employee';
import { EmployeeStatus } from '././employeeStatus';
import { Employees } from '././employees';
import { EmploymentBasis } from '././employmentBasis';
import { EmploymentTerminationPaymentType } from '././employmentTerminationPaymentType';
import { EmploymentType } from '././employmentType';
import { EntitlementFinalPayPayoutType } from '././entitlementFinalPayPayoutType';
import { HomeAddress } from '././homeAddress';
import { IncomeType } from '././incomeType';
import { LeaveAccrualLine } from '././leaveAccrualLine';
import { LeaveApplication } from '././leaveApplication';
import { LeaveApplications } from '././leaveApplications';
import { LeaveBalance } from '././leaveBalance';
import { LeaveCategoryCode } from '././leaveCategoryCode';
import { LeaveEarningsLine } from '././leaveEarningsLine';
import { LeaveLine } from '././leaveLine';
import { LeaveLineCalculationType } from '././leaveLineCalculationType';
import { LeaveLines } from '././leaveLines';
import { LeavePeriod } from '././leavePeriod';
import { LeavePeriodStatus } from '././leavePeriodStatus';
import { LeaveType } from '././leaveType';
import { LeaveTypeContributionType } from '././leaveTypeContributionType';
import { ManualTaxType } from '././manualTaxType';
import { OpeningBalances } from '././openingBalances';
import { PaidLeaveEarningsLine } from '././paidLeaveEarningsLine';
import { PayItem } from '././payItem';
import { PayItems } from '././payItems';
import { PayOutType } from '././payOutType';
import { PayRun } from '././payRun';
import { PayRunStatus } from '././payRunStatus';
import { PayRuns } from '././payRuns';
import { PayTemplate } from '././payTemplate';
import { PaymentFrequencyType } from '././paymentFrequencyType';
import { PayrollCalendar } from '././payrollCalendar';
import { PayrollCalendars } from '././payrollCalendars';
import { Payslip } from '././payslip';
import { PayslipLines } from '././payslipLines';
import { PayslipObject } from '././payslipObject';
import { PayslipSummary } from '././payslipSummary';
import { Payslips } from '././payslips';
import { RateType } from '././rateType';
import { ReimbursementLine } from '././reimbursementLine';
import { ReimbursementLines } from '././reimbursementLines';
import { ReimbursementType } from '././reimbursementType';
import { ResidencyStatus } from '././residencyStatus';
import { SeniorMaritalStatus } from '././seniorMaritalStatus';
import { Settings } from '././settings';
import { SettingsObject } from '././settingsObject';
import { SettingsTrackingCategories } from '././settingsTrackingCategories';
import { SettingsTrackingCategoriesEmployeeGroups } from '././settingsTrackingCategoriesEmployeeGroups';
import { SettingsTrackingCategoriesTimesheetCategories } from '././settingsTrackingCategoriesTimesheetCategories';
import { State } from '././state';
import { SuperFund } from '././superFund';
import { SuperFundProduct } from '././superFundProduct';
import { SuperFundProducts } from '././superFundProducts';
import { SuperFundType } from '././superFundType';
import { SuperFunds } from '././superFunds';
import { SuperLine } from '././superLine';
import { SuperMembership } from '././superMembership';
import { SuperannuationCalculationType } from '././superannuationCalculationType';
import { SuperannuationContributionType } from '././superannuationContributionType';
import { SuperannuationLine } from '././superannuationLine';
import { TFNExemptionType } from '././tFNExemptionType';
import { TaxDeclaration } from '././taxDeclaration';
import { TaxLine } from '././taxLine';
import { TaxScaleType } from '././taxScaleType';
import { Timesheet } from '././timesheet';
import { TimesheetLine } from '././timesheetLine';
import { TimesheetObject } from '././timesheetObject';
import { TimesheetStatus } from '././timesheetStatus';
import { Timesheets } from '././timesheets';
import { ValidationError } from '././validationError';
import { WorkCondition } from '././workCondition';

import * as fs from 'fs';
import { Readable } from "stream";

export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    }
}

export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile | Readable;

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
        "AccountType": AccountType,
        "AllowanceCategory": AllowanceCategory,
        "AllowanceType": AllowanceType,
        "CalendarType": CalendarType,
        "CountryOfResidence": CountryOfResidence,
        "DeductionType.DeductionCategoryEnum": DeductionType.DeductionCategoryEnum,
        "DeductionTypeCalculationType": DeductionTypeCalculationType,
        "EarningsRateCalculationType": EarningsRateCalculationType,
        "EarningsType": EarningsType,
        "Employee.GenderEnum": Employee.GenderEnum,
        "Employee.TerminationReasonEnum": Employee.TerminationReasonEnum,
        "EmployeeStatus": EmployeeStatus,
        "EmploymentBasis": EmploymentBasis,
        "EmploymentTerminationPaymentType": EmploymentTerminationPaymentType,
        "EmploymentType": EmploymentType,
        "EntitlementFinalPayPayoutType": EntitlementFinalPayPayoutType,
        "IncomeType": IncomeType,
        "LeaveCategoryCode": LeaveCategoryCode,
        "LeaveLineCalculationType": LeaveLineCalculationType,
        "LeavePeriodStatus": LeavePeriodStatus,
        "LeaveTypeContributionType": LeaveTypeContributionType,
        "ManualTaxType": ManualTaxType,
        "PayOutType": PayOutType,
        "PayRunStatus": PayRunStatus,
        "PaymentFrequencyType": PaymentFrequencyType,
        "RateType": RateType,
        "ResidencyStatus": ResidencyStatus,
        "SeniorMaritalStatus": SeniorMaritalStatus,
        "State": State,
        "SuperFundType": SuperFundType,
        "SuperannuationCalculationType": SuperannuationCalculationType,
        "SuperannuationContributionType": SuperannuationContributionType,
        "TFNExemptionType": TFNExemptionType,
        "TaxScaleType": TaxScaleType,
        "TimesheetStatus": TimesheetStatus,
        "WorkCondition": WorkCondition,
}

let typeMap: {[index: string]: any} = {
    "APIException": APIException,
    "Account": Account,
    "BankAccount": BankAccount,
    "DeductionLine": DeductionLine,
    "DeductionType": DeductionType,
    "EarningsLine": EarningsLine,
    "EarningsRate": EarningsRate,
    "Employee": Employee,
    "Employees": Employees,
    "HomeAddress": HomeAddress,
    "LeaveAccrualLine": LeaveAccrualLine,
    "LeaveApplication": LeaveApplication,
    "LeaveApplications": LeaveApplications,
    "LeaveBalance": LeaveBalance,
    "LeaveEarningsLine": LeaveEarningsLine,
    "LeaveLine": LeaveLine,
    "LeaveLines": LeaveLines,
    "LeavePeriod": LeavePeriod,
    "LeaveType": LeaveType,
    "OpeningBalances": OpeningBalances,
    "PaidLeaveEarningsLine": PaidLeaveEarningsLine,
    "PayItem": PayItem,
    "PayItems": PayItems,
    "PayRun": PayRun,
    "PayRuns": PayRuns,
    "PayTemplate": PayTemplate,
    "PayrollCalendar": PayrollCalendar,
    "PayrollCalendars": PayrollCalendars,
    "Payslip": Payslip,
    "PayslipLines": PayslipLines,
    "PayslipObject": PayslipObject,
    "PayslipSummary": PayslipSummary,
    "Payslips": Payslips,
    "ReimbursementLine": ReimbursementLine,
    "ReimbursementLines": ReimbursementLines,
    "ReimbursementType": ReimbursementType,
    "Settings": Settings,
    "SettingsObject": SettingsObject,
    "SettingsTrackingCategories": SettingsTrackingCategories,
    "SettingsTrackingCategoriesEmployeeGroups": SettingsTrackingCategoriesEmployeeGroups,
    "SettingsTrackingCategoriesTimesheetCategories": SettingsTrackingCategoriesTimesheetCategories,
    "SuperFund": SuperFund,
    "SuperFundProduct": SuperFundProduct,
    "SuperFundProducts": SuperFundProducts,
    "SuperFunds": SuperFunds,
    "SuperLine": SuperLine,
    "SuperMembership": SuperMembership,
    "SuperannuationLine": SuperannuationLine,
    "TaxDeclaration": TaxDeclaration,
    "TaxLine": TaxLine,
    "Timesheet": Timesheet,
    "TimesheetLine": TimesheetLine,
    "TimesheetObject": TimesheetObject,
    "Timesheets": Timesheets,
    "ValidationError": ValidationError,
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
                instance[attributeType['baseName']] = ObjectSerializer.serialize(data[attributeType['name']], attributeType['type']);
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
            for (let [index, currentData] of Object.entries(dataFormatted)) {
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
            for (let [index, attributeType] of Object.entries(attributeTypes)) {
                instance[attributeType['name']] = ObjectSerializer.deserialize(data[attributeType['baseName']], attributeType['type']);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: AxiosRequestConfig): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: AxiosRequestConfig): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: AxiosRequestConfig): void {
        if (this.location == "query") {
            (<any>requestOptions.params)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: AxiosRequestConfig): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_): void {
        // Do nothing
    }
}
