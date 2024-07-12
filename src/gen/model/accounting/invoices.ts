import { Invoice } from '././invoice';
import { Pagination } from '././pagination';

export class Invoices {
    'pagination'?: Pagination;
    'invoices'?: Array<Invoice>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "invoices",
            "baseName": "Invoices",
            "type": "Array<Invoice>"
        }    ];

    static getAttributeTypeMap() {
        return Invoices.attributeTypeMap;
    }
}

