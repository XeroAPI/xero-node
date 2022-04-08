import { EmployeeLeaveType } from '././employeeLeaveType';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeLeaveTypes {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'leaveTypes'?: Array<EmployeeLeaveType>;

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
            "name": "leaveTypes",
            "baseName": "leaveTypes",
            "type": "Array<EmployeeLeaveType>"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeLeaveTypes.attributeTypeMap;
    }
}

