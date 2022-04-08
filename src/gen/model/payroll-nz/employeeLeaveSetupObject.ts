import { EmployeeLeaveSetup } from '././employeeLeaveSetup';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeLeaveSetupObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'leaveSetup'?: EmployeeLeaveSetup;

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
            "name": "leaveSetup",
            "baseName": "leaveSetup",
            "type": "EmployeeLeaveSetup"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeLeaveSetupObject.attributeTypeMap;
    }
}

