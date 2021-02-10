
export class PaymentDelete {
    /**
    * The status of the payment.
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
        return PaymentDelete.attributeTypeMap;
    }
}

