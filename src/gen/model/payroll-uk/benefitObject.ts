import { Benefit } from '././benefit';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class BenefitObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'benefit'?: Benefit;

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
            "name": "benefit",
            "baseName": "benefit",
            "type": "Benefit"
        }    ];

    static getAttributeTypeMap() {
        return BenefitObject.attributeTypeMap;
    }
}

