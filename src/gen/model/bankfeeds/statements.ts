import { Pagination } from '././pagination';
import { Statement } from '././statement';

export class Statements {
    'pagination'?: Pagination;
    'items'?: Array<Statement>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        }        {
            "name": "items",
            "baseName": "items",
            "type": "Array<Statement>"
        }    ];

    static getAttributeTypeMap() {
        return Statements.attributeTypeMap;
    }
}

