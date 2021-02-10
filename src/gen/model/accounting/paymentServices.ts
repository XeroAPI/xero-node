import { PaymentService } from '././paymentService';

export class PaymentServices {
    'paymentServices'?: Array<PaymentService>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "paymentServices",
            "baseName": "PaymentServices",
            "type": "Array<PaymentService>"
        }    ];

    static getAttributeTypeMap() {
        return PaymentServices.attributeTypeMap;
    }
}

