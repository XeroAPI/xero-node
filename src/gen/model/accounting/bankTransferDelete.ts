
export class BankTransferDelete {
    /**
    * The Xero identifier for a bank transfer
    */
    'bankTransferID': string;
    /**
    * The status of the bank transfer.
    */
    'status': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "bankTransferID",
            "baseName": "BankTransferID",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return BankTransferDelete.attributeTypeMap;
    }
}

