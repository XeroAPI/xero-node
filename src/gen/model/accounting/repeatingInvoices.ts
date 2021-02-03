import { RepeatingInvoice } from '././repeatingInvoice';

export class RepeatingInvoices {
    'repeatingInvoices'?: Array<RepeatingInvoice>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "repeatingInvoices",
            "baseName": "RepeatingInvoices",
            "type": "Array<RepeatingInvoice>"
        }    ];

    static getAttributeTypeMap() {
        return RepeatingInvoices.attributeTypeMap;
    }
}

