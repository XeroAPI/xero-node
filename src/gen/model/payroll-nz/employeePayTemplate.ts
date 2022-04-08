import { EarningsTemplate } from '././earningsTemplate';

export class EmployeePayTemplate {
    /**
    * Unique identifier for the employee
    */
    'employeeID'?: string;
    'earningTemplates'?: Array<EarningsTemplate>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "employeeID",
            "baseName": "employeeID",
            "type": "string"
        },
        {
            "name": "earningTemplates",
            "baseName": "earningTemplates",
            "type": "Array<EarningsTemplate>"
        }    ];

    static getAttributeTypeMap() {
        return EmployeePayTemplate.attributeTypeMap;
    }
}

