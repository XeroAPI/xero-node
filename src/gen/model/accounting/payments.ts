import { Pagination } from '././pagination';
import { Payment } from '././payment';

export class Payments {
    'pagination'?: Pagination;
    'payments'?: Array<Payment>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "payments",
            "baseName": "Payments",
            "type": "Array<Payment>"
        }    ];

    static getAttributeTypeMap() {
        return Payments.attributeTypeMap;
    }
}

