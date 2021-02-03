
export class PaymentLine {
    /**
    * Xero identifier for payroll payment line
    */
    'paymentLineID'?: string;
    /**
    * The amount of the payment line
    */
    'amount'?: number;
    /**
    * The account number
    */
    'accountNumber'?: string;
    /**
    * The account sort code
    */
    'sortCode'?: string;
    /**
    * The account name
    */
    'accountName'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "paymentLineID",
            "baseName": "paymentLineID",
            "type": "string"
        },
        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
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
        },
        {
            "name": "accountName",
            "baseName": "accountName",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return PaymentLine.attributeTypeMap;
    }
}

