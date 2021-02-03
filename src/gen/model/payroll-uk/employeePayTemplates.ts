import { EarningsTemplate } from '././earningsTemplate';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeePayTemplates {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'earningTemplates'?: Array<EarningsTemplate>;

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
            "name": "earningTemplates",
            "baseName": "earningTemplates",
            "type": "Array<EarningsTemplate>"
        }    ];

    static getAttributeTypeMap() {
        return EmployeePayTemplates.attributeTypeMap;
    }
}

