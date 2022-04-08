import { Pagination } from '././pagination';
import { Problem } from '././problem';
import { StatutoryDeduction } from '././statutoryDeduction';

export class StatutoryDeductions {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'statutoryDeductions'?: Array<StatutoryDeduction>;

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
            "name": "statutoryDeductions",
            "baseName": "statutoryDeductions",
            "type": "Array<StatutoryDeduction>"
        }    ];

    static getAttributeTypeMap() {
        return StatutoryDeductions.attributeTypeMap;
    }
}

