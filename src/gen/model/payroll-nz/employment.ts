
export class Employment {
    /**
    * Xero unique identifier for the payroll calendar of the employee
    */
    'payrollCalendarID'?: string;
    /**
    * Xero unique identifier for the payrun calendar for the employee (Deprecated in version 1.1.6)
    */
    'payRunCalendarID'?: string;
    /**
    * Start date of the employment (YYYY-MM-DD)
    */
    'startDate'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payrollCalendarID",
            "baseName": "payrollCalendarID",
            "type": "string"
        },
        {
            "name": "payRunCalendarID",
            "baseName": "payRunCalendarID",
            "type": "string"
        },
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Employment.attributeTypeMap;
    }
}

