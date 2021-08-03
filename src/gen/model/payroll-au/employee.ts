import { BankAccount } from '././bankAccount';
import { EmployeeStatus } from '././employeeStatus';
import { HomeAddress } from '././homeAddress';
import { LeaveBalance } from '././leaveBalance';
import { LeaveLine } from '././leaveLine';
import { OpeningBalances } from '././openingBalances';
import { PayTemplate } from '././payTemplate';
import { SuperMembership } from '././superMembership';
import { TaxDeclaration } from '././taxDeclaration';
import { ValidationError } from '././validationError';

export class Employee {
    /**
    * First name of employee
    */
    'firstName': string;
    /**
    * Last name of employee
    */
    'lastName': string;
    /**
    * Date of birth of the employee (YYYY-MM-DD)
    */
    'dateOfBirth': string;
    'homeAddress'?: HomeAddress;
    /**
    * Start date for an employee (YYYY-MM-DD)
    */
    'startDate'?: string;
    /**
    * Title of the employee
    */
    'title'?: string;
    /**
    * Middle name(s) of the employee
    */
    'middleNames'?: string;
    /**
    * The email address for the employee
    */
    'email'?: string;
    /**
    * The employee’s gender. See Employee Gender
    */
    'gender'?: Employee.GenderEnum;
    /**
    * Employee phone number
    */
    'phone'?: string;
    /**
    * Employee mobile number
    */
    'mobile'?: string;
    /**
    * Employee’s twitter name
    */
    'twitterUserName'?: string;
    /**
    * Authorised to approve other employees\' leave requests
    */
    'isAuthorisedToApproveLeave'?: boolean;
    /**
    * Authorised to approve timesheets
    */
    'isAuthorisedToApproveTimesheets'?: boolean;
    /**
    * JobTitle of the employee
    */
    'jobTitle'?: string;
    /**
    * Employees classification
    */
    'classification'?: string;
    /**
    * Xero unique identifier for earnings rate
    */
    'ordinaryEarningsRateID'?: string;
    /**
    * Xero unique identifier for payroll calendar for the employee
    */
    'payrollCalendarID'?: string;
    /**
    * The Employee Group allows you to report on payroll expenses and liabilities for each group of employees
    */
    'employeeGroupName'?: string;
    /**
    * Xero unique identifier for an Employee
    */
    'employeeID'?: string;
    /**
    * Employee Termination Date (YYYY-MM-DD)
    */
    'terminationDate'?: string;
    /**
    * * `V` Voluntary cessation - An employee resignation, retirement, domestic or pressing necessity or abandonment of employment * `I` Ill health - An employee resignation due to medical condition that prevents the continuation of employment, such as for illness, ill-health, medical unfitness or total permanent disability * `D` Deceased - The death of an employee * `R` Redundancy - An employer-initiated termination of employment due to a genuine redundancy or approved early retirement scheme * `F` Dismissal - An employer-initiated termination of employment due to dismissal, inability to perform the required work, misconduct or inefficiency * `C` Contract cessation - The natural conclusion of a limited employment relationship due to contract/engagement duration or task completion, seasonal work completion, or to cease casuals that are no longer required * `T` Transfer - The administrative arrangements performed to transfer employees across payroll systems, move them temporarily to another employer (machinery of government for public servants), transfer of business, move them to outsourcing arrangements or other such technical activities. 
    */
    'terminationReason'?: Employee.TerminationReasonEnum;
    'bankAccounts'?: Array<BankAccount>;
    'payTemplate'?: PayTemplate;
    'openingBalances'?: OpeningBalances;
    'taxDeclaration'?: TaxDeclaration;
    'leaveBalances'?: Array<LeaveBalance>;
    'leaveLines'?: Array<LeaveLine>;
    'superMemberships'?: Array<SuperMembership>;
    'status'?: EmployeeStatus;
    /**
    * Last modified timestamp
    */
    'updatedDateUTC'?: Date;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "firstName",
            "baseName": "FirstName",
            "type": "string"
        },
        {
            "name": "lastName",
            "baseName": "LastName",
            "type": "string"
        },
        {
            "name": "dateOfBirth",
            "baseName": "DateOfBirth",
            "type": "string"
        },
        {
            "name": "homeAddress",
            "baseName": "HomeAddress",
            "type": "HomeAddress"
        },
        {
            "name": "startDate",
            "baseName": "StartDate",
            "type": "string"
        },
        {
            "name": "title",
            "baseName": "Title",
            "type": "string"
        },
        {
            "name": "middleNames",
            "baseName": "MiddleNames",
            "type": "string"
        },
        {
            "name": "email",
            "baseName": "Email",
            "type": "string"
        },
        {
            "name": "gender",
            "baseName": "Gender",
            "type": "Employee.GenderEnum"
        },
        {
            "name": "phone",
            "baseName": "Phone",
            "type": "string"
        },
        {
            "name": "mobile",
            "baseName": "Mobile",
            "type": "string"
        },
        {
            "name": "twitterUserName",
            "baseName": "TwitterUserName",
            "type": "string"
        },
        {
            "name": "isAuthorisedToApproveLeave",
            "baseName": "IsAuthorisedToApproveLeave",
            "type": "boolean"
        },
        {
            "name": "isAuthorisedToApproveTimesheets",
            "baseName": "IsAuthorisedToApproveTimesheets",
            "type": "boolean"
        },
        {
            "name": "jobTitle",
            "baseName": "JobTitle",
            "type": "string"
        },
        {
            "name": "classification",
            "baseName": "Classification",
            "type": "string"
        },
        {
            "name": "ordinaryEarningsRateID",
            "baseName": "OrdinaryEarningsRateID",
            "type": "string"
        },
        {
            "name": "payrollCalendarID",
            "baseName": "PayrollCalendarID",
            "type": "string"
        },
        {
            "name": "employeeGroupName",
            "baseName": "EmployeeGroupName",
            "type": "string"
        },
        {
            "name": "employeeID",
            "baseName": "EmployeeID",
            "type": "string"
        },
        {
            "name": "terminationDate",
            "baseName": "TerminationDate",
            "type": "string"
        },
        {
            "name": "terminationReason",
            "baseName": "TerminationReason",
            "type": "Employee.TerminationReasonEnum"
        },
        {
            "name": "bankAccounts",
            "baseName": "BankAccounts",
            "type": "Array<BankAccount>"
        },
        {
            "name": "payTemplate",
            "baseName": "PayTemplate",
            "type": "PayTemplate"
        },
        {
            "name": "openingBalances",
            "baseName": "OpeningBalances",
            "type": "OpeningBalances"
        },
        {
            "name": "taxDeclaration",
            "baseName": "TaxDeclaration",
            "type": "TaxDeclaration"
        },
        {
            "name": "leaveBalances",
            "baseName": "LeaveBalances",
            "type": "Array<LeaveBalance>"
        },
        {
            "name": "leaveLines",
            "baseName": "LeaveLines",
            "type": "Array<LeaveLine>"
        },
        {
            "name": "superMemberships",
            "baseName": "SuperMemberships",
            "type": "Array<SuperMembership>"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "EmployeeStatus"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        }    ];

    static getAttributeTypeMap() {
        return Employee.attributeTypeMap;
    }
}

export namespace Employee {
    export enum GenderEnum {
        N = <any> 'N',
        M = <any> 'M',
        F = <any> 'F',
        I = <any> 'I'
    }
    export enum TerminationReasonEnum {
        V = <any> 'V',
        I = <any> 'I',
        D = <any> 'D',
        R = <any> 'R',
        F = <any> 'F',
        C = <any> 'C',
        T = <any> 'T'
    }
}
