import { EarningsOrder } from '././earningsOrder';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EarningsOrderObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'statutoryDeduction'?: EarningsOrder;

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
            "name": "statutoryDeduction",
            "baseName": "statutoryDeduction",
            "type": "EarningsOrder"
        }    ];

    static getAttributeTypeMap() {
        return EarningsOrderObject.attributeTypeMap;
    }
}

