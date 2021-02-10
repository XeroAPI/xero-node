import { Pagination } from '././pagination';
import { Problem } from '././problem';
import { SalaryAndWage } from '././salaryAndWage';

export class SalaryAndWageObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'salaryAndWages'?: SalaryAndWage;

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
            "name": "salaryAndWages",
            "baseName": "salaryAndWages",
            "type": "SalaryAndWage"
        }    ];

    static getAttributeTypeMap() {
        return SalaryAndWageObject.attributeTypeMap;
    }
}

