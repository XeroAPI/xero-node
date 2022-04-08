import { EarningsRate } from '././earningsRate';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EarningsRates {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'earningsRates'?: Array<EarningsRate>;

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
            "name": "earningsRates",
            "baseName": "earningsRates",
            "type": "Array<EarningsRate>"
        }    ];

    static getAttributeTypeMap() {
        return EarningsRates.attributeTypeMap;
    }
}

