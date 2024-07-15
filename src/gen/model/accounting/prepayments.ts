import { Pagination } from '././pagination';
import { Prepayment } from '././prepayment';

export class Prepayments {
    'pagination'?: Pagination;
    'prepayments'?: Array<Prepayment>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "prepayments",
            "baseName": "Prepayments",
            "type": "Array<Prepayment>"
        }    ];

    static getAttributeTypeMap() {
        return Prepayments.attributeTypeMap;
    }
}

