import { AccountType } from '././accountType';

export class NewAccountFeedConnection {
    /**
    * The financial institute\'s identifier for the account. Must be unique within your financial institute. 
    */
    'accountToken': string;
    'accountType': AccountType;
    /**
    * The account number for the Xero Bank Account being created. Up to 40 characters when `accountType` is `BANK`. When `accountType` is `CREDITCARD`, supply only the last four digits, and digits only. 
    */
    'accountNumber': string;
    /**
    * The name for the Xero Bank Account being created. Rejected if the Organisation already has an account with this name. 
    */
    'accountName': string;
    /**
    * ISO-4217 currency code. Must be a currency the Organisation has.
    */
    'currency': string;
    /**
    * ISO-3166 alpha-2 country code. Required only when the Application supports multiple regions. 
    */
    'country'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountToken",
            "baseName": "accountToken",
            "type": "string"
        },
        {
            "name": "accountType",
            "baseName": "accountType",
            "type": "AccountType"
        },
        {
            "name": "accountNumber",
            "baseName": "accountNumber",
            "type": "string"
        },
        {
            "name": "accountName",
            "baseName": "accountName",
            "type": "string"
        },
        {
            "name": "currency",
            "baseName": "currency",
            "type": "string"
        },
        {
            "name": "country",
            "baseName": "country",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return NewAccountFeedConnection.attributeTypeMap;
    }
}

