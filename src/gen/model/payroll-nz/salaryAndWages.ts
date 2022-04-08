import { Pagination } from '././pagination';
import { Problem } from '././problem';
import { SalaryAndWage } from '././salaryAndWage';

export class SalaryAndWages {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'salaryAndWages'?: Array<SalaryAndWage>;

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
            "name": "salaryAndWages",
            "baseName": "salaryAndWages",
            "type": "Array<SalaryAndWage>"
        }    ];

    static getAttributeTypeMap() {
        return SalaryAndWages.attributeTypeMap;
    }
}

