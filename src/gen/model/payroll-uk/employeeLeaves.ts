import { EmployeeLeave } from '././employeeLeave';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeLeaves {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'leave'?: Array<EmployeeLeave>;

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
            "name": "leave",
            "baseName": "leave",
            "type": "Array<EmployeeLeave>"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeLeaves.attributeTypeMap;
    }
}

