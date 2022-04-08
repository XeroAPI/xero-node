import { EmployeePayTemplate } from '././employeePayTemplate';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeePayTemplates {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'payTemplate'?: EmployeePayTemplate;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        }        {
            "name": "problem",
            "baseName": "problem",
            "type": "Problem"
        }        {
            "name": "payTemplate",
            "baseName": "payTemplate",
            "type": "EmployeePayTemplate"
        }    ];

    static getAttributeTypeMap() {
        return EmployeePayTemplates.attributeTypeMap;
    }
}

