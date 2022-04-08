import { Pagination } from '././pagination';
import { PayRun } from '././payRun';
import { Problem } from '././problem';

export class PayRuns {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'payRuns'?: Array<PayRun>;

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
            "name": "payRuns",
            "baseName": "payRuns",
            "type": "Array<PayRun>"
        }    ];

    static getAttributeTypeMap() {
        return PayRuns.attributeTypeMap;
    }
}

