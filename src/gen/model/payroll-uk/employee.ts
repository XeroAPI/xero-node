import { Address } from '././address';
import { NICategory } from '././nICategory';
import { NICategoryLetter } from '././nICategoryLetter';

export class Employee {
    /**
    * Xero unique identifier for the employee
    */
    'employeeID'?: string;
    /**
    * Title of the employee
    */
    'title': string;
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
    'address': Address;
    /**
    * The email address for the employee
    */
    'email'?: string;
    /**
    * The employee’s gender
    */
    'gender': Employee.GenderEnum;
    /**
    * Employee phone number
    */
    'phoneNumber'?: string;
    /**
    * Employment start date of the employee at the time it was requested
    */
    'startDate'?: string;
    /**
    * Employment end date of the employee at the time it was requested
    */
    'endDate'?: string;
    /**
    * Xero unique identifier for the payroll calendar of the employee
    */
    'payrollCalendarID'?: string;
    /**
    * UTC timestamp of last update to the employee
    */
    'updatedDateUTC'?: Date;
    /**
    * UTC timestamp when the employee was created in Xero
    */
    'createdDateUTC'?: Date;
    'niCategory'?: NICategoryLetter;
    /**
    * The employee\'s NI categories
    */
    'niCategories'?: Array<NICategory>;
    /**
    * National insurance number of the employee
    */
    'nationalInsuranceNumber'?: string;
    /**
    * Whether the employee is an off payroll worker
    */
    'isOffPayrollWorker'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "employeeID",
            "baseName": "employeeID",
            "type": "string"
        },
        {
            "name": "title",
            "baseName": "title",
            "type": "string"
        },
        {
            "name": "firstName",
            "baseName": "firstName",
            "type": "string"
        },
        {
            "name": "lastName",
            "baseName": "lastName",
            "type": "string"
        },
        {
            "name": "dateOfBirth",
            "baseName": "dateOfBirth",
            "type": "string"
        },
        {
            "name": "address",
            "baseName": "address",
            "type": "Address"
        },
        {
            "name": "email",
            "baseName": "email",
            "type": "string"
        },
        {
            "name": "gender",
            "baseName": "gender",
            "type": "Employee.GenderEnum"
        },
        {
            "name": "phoneNumber",
            "baseName": "phoneNumber",
            "type": "string"
        },
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        },
        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "string"
        },
        {
            "name": "payrollCalendarID",
            "baseName": "payrollCalendarID",
            "type": "string"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "updatedDateUTC",
            "type": "Date"
        },
        {
            "name": "createdDateUTC",
            "baseName": "createdDateUTC",
            "type": "Date"
        },
        {
            "name": "niCategory",
            "baseName": "niCategory",
            "type": "NICategoryLetter"
        },
        {
            "name": "niCategories",
            "baseName": "niCategories",
            "type": "Array<NICategory>"
        },
        {
            "name": "nationalInsuranceNumber",
            "baseName": "nationalInsuranceNumber",
            "type": "string"
        },
        {
            "name": "isOffPayrollWorker",
            "baseName": "isOffPayrollWorker",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return Employee.attributeTypeMap;
    }
}

export namespace Employee {
    export enum GenderEnum {
        M = <any> 'M',
        F = <any> 'F'
    }
}
