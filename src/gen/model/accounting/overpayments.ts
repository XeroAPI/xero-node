import { Overpayment } from '././overpayment';

export class Overpayments {
    'overpayments'?: Array<Overpayment>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "overpayments",
            "baseName": "Overpayments",
            "type": "Array<Overpayment>"
        }    ];

    static getAttributeTypeMap() {
        return Overpayments.attributeTypeMap;
    }
}

