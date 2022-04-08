import { Deduction } from '././deduction';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class DeductionObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'deduction'?: Deduction;

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
            "name": "deduction",
            "baseName": "deduction",
            "type": "Deduction"
        }    ];

    static getAttributeTypeMap() {
        return DeductionObject.attributeTypeMap;
    }
}

