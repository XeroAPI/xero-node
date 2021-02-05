import { Employee } from '././employee';

export class Employees {
    'employees'?: Array<Employee>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "employees",
            "baseName": "Employees",
            "type": "Array<Employee>"
        }    ];

    static getAttributeTypeMap() {
        return Employees.attributeTypeMap;
    }
}

