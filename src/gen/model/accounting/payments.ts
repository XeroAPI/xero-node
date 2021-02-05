import { Payment } from '././payment';

export class Payments {
    'payments'?: Array<Payment>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payments",
            "baseName": "Payments",
            "type": "Array<Payment>"
        }    ];

    static getAttributeTypeMap() {
        return Payments.attributeTypeMap;
    }
}

