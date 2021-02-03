import { Employee } from '././employee';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeObject {
    'pagination'?: Pagination;
    'employee'?: Employee;
    'problem'?: Problem;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "employee",
            "baseName": "employee",
            "type": "Employee"
        },
        {
            "name": "problem",
            "baseName": "problem",
            "type": "Problem"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeObject.attributeTypeMap;
    }
}

