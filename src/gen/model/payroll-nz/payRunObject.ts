import { Pagination } from '././pagination';
import { PayRun } from '././payRun';
import { Problem } from '././problem';

export class PayRunObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'payRun'?: PayRun;

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
            "name": "payRun",
            "baseName": "payRun",
            "type": "PayRun"
        }    ];

    static getAttributeTypeMap() {
        return PayRunObject.attributeTypeMap;
    }
}

