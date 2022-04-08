import { EmployeeStatutoryLeaveBalance } from '././employeeStatutoryLeaveBalance';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeStatutoryLeaveBalanceObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'leaveBalance'?: EmployeeStatutoryLeaveBalance;

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
            "name": "leaveBalance",
            "baseName": "leaveBalance",
            "type": "EmployeeStatutoryLeaveBalance"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeStatutoryLeaveBalanceObject.attributeTypeMap;
    }
}

