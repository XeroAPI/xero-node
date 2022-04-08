import { EmployeeLeaveBalance } from '././employeeLeaveBalance';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeLeaveBalances {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'leaveBalances'?: Array<EmployeeLeaveBalance>;

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
            "name": "leaveBalances",
            "baseName": "leaveBalances",
            "type": "Array<EmployeeLeaveBalance>"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeLeaveBalances.attributeTypeMap;
    }
}

