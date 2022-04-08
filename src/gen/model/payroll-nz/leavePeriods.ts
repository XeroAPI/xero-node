import { LeavePeriod } from '././leavePeriod';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class LeavePeriods {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'periods'?: Array<LeavePeriod>;

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
            "name": "periods",
            "baseName": "periods",
            "type": "Array<LeavePeriod>"
        }    ];

    static getAttributeTypeMap() {
        return LeavePeriods.attributeTypeMap;
    }
}

