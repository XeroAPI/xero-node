import { EmployeeTax } from '././employeeTax';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeTaxObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'employeeTax'?: EmployeeTax;

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
            "name": "employeeTax",
            "baseName": "employeeTax",
            "type": "EmployeeTax"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeTaxObject.attributeTypeMap;
    }
}

