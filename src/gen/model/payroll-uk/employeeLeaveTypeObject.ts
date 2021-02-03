import { EmployeeLeaveType } from '././employeeLeaveType';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeLeaveTypeObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'leaveType'?: EmployeeLeaveType;

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
            "name": "leaveType",
            "baseName": "leaveType",
            "type": "EmployeeLeaveType"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeLeaveTypeObject.attributeTypeMap;
    }
}

