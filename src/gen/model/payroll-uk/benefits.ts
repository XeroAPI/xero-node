import { Benefit } from '././benefit';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class Benefits {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'benefits'?: Array<Benefit>;

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
            "name": "benefits",
            "baseName": "benefits",
            "type": "Array<Benefit>"
        }    ];

    static getAttributeTypeMap() {
        return Benefits.attributeTypeMap;
    }
}

