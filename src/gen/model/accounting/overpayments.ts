import { Overpayment } from '././overpayment';
import { Pagination } from '././pagination';

export class Overpayments {
    'pagination'?: Pagination;
    'overpayments'?: Array<Overpayment>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "overpayments",
            "baseName": "Overpayments",
            "type": "Array<Overpayment>"
        }    ];

    static getAttributeTypeMap() {
        return Overpayments.attributeTypeMap;
    }
}

