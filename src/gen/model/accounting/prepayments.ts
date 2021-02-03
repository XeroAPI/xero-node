import { Prepayment } from '././prepayment';

export class Prepayments {
    'prepayments'?: Array<Prepayment>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "prepayments",
            "baseName": "Prepayments",
            "type": "Array<Prepayment>"
        }    ];

    static getAttributeTypeMap() {
        return Prepayments.attributeTypeMap;
    }
}

