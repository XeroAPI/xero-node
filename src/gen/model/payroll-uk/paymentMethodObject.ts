import { Pagination } from '././pagination';
import { PaymentMethod } from '././paymentMethod';
import { Problem } from '././problem';

export class PaymentMethodObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'paymentMethod'?: PaymentMethod;

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
            "name": "paymentMethod",
            "baseName": "paymentMethod",
            "type": "PaymentMethod"
        }    ];

    static getAttributeTypeMap() {
        return PaymentMethodObject.attributeTypeMap;
    }
}

