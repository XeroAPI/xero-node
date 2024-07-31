import { EmployeeWorkingPatternWithWorkingWeeks } from '././employeeWorkingPatternWithWorkingWeeks';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeWorkingPatternWithWorkingWeeksObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'payeeWorkingPattern'?: EmployeeWorkingPatternWithWorkingWeeks;

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
            "name": "payeeWorkingPattern",
            "baseName": "payeeWorkingPattern",
            "type": "EmployeeWorkingPatternWithWorkingWeeks"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeWorkingPatternWithWorkingWeeksObject.attributeTypeMap;
    }
}

