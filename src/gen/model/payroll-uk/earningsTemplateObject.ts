import { EarningsTemplate } from '././earningsTemplate';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EarningsTemplateObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'earningTemplate'?: EarningsTemplate;

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
            "name": "earningTemplate",
            "baseName": "earningTemplate",
            "type": "EarningsTemplate"
        }    ];

    static getAttributeTypeMap() {
        return EarningsTemplateObject.attributeTypeMap;
    }
}

