import { EmployeeOpeningBalance } from '././employeeOpeningBalance';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeOpeningBalancesObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'openingBalances'?: Array<EmployeeOpeningBalance>;

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
            "name": "openingBalances",
            "baseName": "openingBalances",
            "type": "Array<EmployeeOpeningBalance>"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeOpeningBalancesObject.attributeTypeMap;
    }
}

