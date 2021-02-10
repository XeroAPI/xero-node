import { OnlineInvoice } from '././onlineInvoice';

export class OnlineInvoices {
    'onlineInvoices'?: Array<OnlineInvoice>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "onlineInvoices",
            "baseName": "OnlineInvoices",
            "type": "Array<OnlineInvoice>"
        }    ];

    static getAttributeTypeMap() {
        return OnlineInvoices.attributeTypeMap;
    }
}

