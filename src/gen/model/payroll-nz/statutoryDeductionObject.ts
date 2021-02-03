import { Pagination } from '././pagination';
import { Problem } from '././problem';
import { StatutoryDeduction } from '././statutoryDeduction';

export class StatutoryDeductionObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'statutoryDeduction'?: StatutoryDeduction;

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
            "type": "StatutoryDeduction"
        }    ];

    static getAttributeTypeMap() {
        return StatutoryDeductionObject.attributeTypeMap;
    }
}

