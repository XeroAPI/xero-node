
export class OnlineInvoice {
    /**
    * the URL to an online invoice
    */
    'onlineInvoiceUrl'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "onlineInvoiceUrl",
            "baseName": "OnlineInvoiceUrl",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return OnlineInvoice.attributeTypeMap;
    }
}

