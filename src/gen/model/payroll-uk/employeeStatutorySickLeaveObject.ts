import { EmployeeStatutorySickLeave } from '././employeeStatutorySickLeave';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeStatutorySickLeaveObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'statutorySickLeave'?: EmployeeStatutorySickLeave;

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
            "name": "statutorySickLeave",
            "baseName": "statutorySickLeave",
            "type": "EmployeeStatutorySickLeave"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeStatutorySickLeaveObject.attributeTypeMap;
    }
}

