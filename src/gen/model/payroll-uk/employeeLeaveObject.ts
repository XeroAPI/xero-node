import { EmployeeLeave } from '././employeeLeave';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeLeaveObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'leave'?: EmployeeLeave;

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
            "type": "EmployeeLeave"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeLeaveObject.attributeTypeMap;
    }
}

