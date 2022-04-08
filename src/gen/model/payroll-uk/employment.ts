
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
    /**
    * The NI Category of the employee
    */
    'niCategory'?: Employment.NiCategoryEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payrollCalendarID",
            "baseName": "payrollCalendarID",
            "type": "string"
        }        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        }        {
            "name": "employeeNumber",
            "baseName": "employeeNumber",
            "type": "string"
        }        {
            "name": "niCategory",
            "baseName": "niCategory",
            "type": "Employment.NiCategoryEnum"
        }    ];

    static getAttributeTypeMap() {
        return Employment.attributeTypeMap;
    }
}

export namespace Employment {
    export enum NiCategoryEnum {
        A = <any> 'A',
        B = <any> 'B',
        C = <any> 'C',
        F = <any> 'F',
        H = <any> 'H',
        I = <any> 'I',
        J = <any> 'J',
        L = <any> 'L',
        M = <any> 'M',
        S = <any> 'S',
        V = <any> 'V',
        X = <any> 'X',
        Z = <any> 'Z'
    }
}
