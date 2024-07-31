import { EmployeeWorkingPattern } from '././employeeWorkingPattern';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeWorkingPatternsObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'payeeWorkingPatterns'?: Array<EmployeeWorkingPattern>;

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
            "name": "payeeWorkingPatterns",
            "baseName": "payeeWorkingPatterns",
            "type": "Array<EmployeeWorkingPattern>"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeWorkingPatternsObject.attributeTypeMap;
    }
}

