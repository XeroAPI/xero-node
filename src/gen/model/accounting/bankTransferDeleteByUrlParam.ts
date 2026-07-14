
export class BankTransferDeleteByUrlParam {
    /**
    * The status of the bank transfer.
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
        return BankTransferDeleteByUrlParam.attributeTypeMap;
    }
}

