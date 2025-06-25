import { NICategory } from '././nICategory';
import { NICategoryLetter } from '././nICategoryLetter';

export class Employment {
    /**
    * Xero unique identifier for the payroll calendar of the employee
    */
    'payrollCalendarID'?: string;
    /**
    * Start date of the employment (YYYY-MM-DD)
    */
    'startDate'?: string;
    /**
    * The employment number of the employee
    */
    'employeeNumber'?: string;
    'niCategory'?: NICategoryLetter;
    /**
    * The employee\'s NI categories
    */
    'niCategories'?: Array<NICategory>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payrollCalendarID",
            "baseName": "payrollCalendarID",
            "type": "string"
        },
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        },
        {
            "name": "employeeNumber",
            "baseName": "employeeNumber",
            "type": "string"
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
        }    ];

    static getAttributeTypeMap() {
        return Employment.attributeTypeMap;
    }
}

