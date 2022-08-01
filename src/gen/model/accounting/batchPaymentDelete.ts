
export class BatchPaymentDelete {
    /**
    * The Xero generated unique identifier for the bank transaction (read-only)
    */
    'batchPaymentID': string;
    /**
    * The status of the batch payment.
    */
    'status': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "batchPaymentID",
            "baseName": "BatchPaymentID",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return BatchPaymentDelete.attributeTypeMap;
    }
}

