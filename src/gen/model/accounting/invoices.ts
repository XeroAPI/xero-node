import { Invoice } from '././invoice';

export class Invoices {
    'invoices'?: Array<Invoice>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "invoices",
            "baseName": "Invoices",
            "type": "Array<Invoice>"
        }    ];

    static getAttributeTypeMap() {
        return Invoices.attributeTypeMap;
    }
}

