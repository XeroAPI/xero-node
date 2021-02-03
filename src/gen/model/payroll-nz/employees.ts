import { Employee } from '././employee';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class Employees {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'employees'?: Array<Employee>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "problem",
            "baseName": "problem",
            "type": "Problem"
        },
        {
            "name": "employees",
            "baseName": "employees",
            "type": "Array<Employee>"
        }    ];

    static getAttributeTypeMap() {
        return Employees.attributeTypeMap;
    }
}

