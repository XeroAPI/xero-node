import { EarningsRate } from '././earningsRate';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EarningsRateObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'earningsRate'?: EarningsRate;

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
            "name": "earningsRate",
            "baseName": "earningsRate",
            "type": "EarningsRate"
        }    ];

    static getAttributeTypeMap() {
        return EarningsRateObject.attributeTypeMap;
    }
}

