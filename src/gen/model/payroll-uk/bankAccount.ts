
export class BankAccount {
    /**
    * Bank account name (max length = 32)
    */
    'accountName': string;
    /**
    * Bank account number (digits only; max length = 8)
    */
    'accountNumber': string;
    /**
    * Bank account sort code (6 digits)
    */
    'sortCode': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountName",
            "baseName": "accountName",
            "type": "string"
        },
        {
            "name": "accountNumber",
            "baseName": "accountNumber",
            "type": "string"
        },
        {
            "name": "sortCode",
            "baseName": "sortCode",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return BankAccount.attributeTypeMap;
    }
}

