import { Employment } from '././employment';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmploymentObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'employment'?: Employment;

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
            "name": "employment",
            "baseName": "employment",
            "type": "Employment"
        }    ];

    static getAttributeTypeMap() {
        return EmploymentObject.attributeTypeMap;
    }
}

