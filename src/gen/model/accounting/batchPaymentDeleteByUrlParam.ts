
export class BatchPaymentDeleteByUrlParam {
    /**
    * The status of the batch payment.
    */
    'status': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "status",
            "baseName": "Status",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return BatchPaymentDeleteByUrlParam.attributeTypeMap;
    }
}

