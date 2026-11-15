import { AccountType } from '././accountType';

export class ExistingAccountFeedConnection {
    /**
    * The Xero Bank Account to connect the feed to. Required. An all-zeros GUID is treated as though the field were absent. 
    */
    'accountId': string;
    /**
    * The financial institute\'s identifier for the account. Must be unique within your financial institute. Some financial institutes additionally constrain its format. 
    */
    'accountToken': string;
    'accountType': AccountType;
    /**
    * ISO-4217 currency code. Must match the currency of the Xero Bank Account named by `accountId`, and must be a currency the Organisation has. 
    */
    'currency': string;
    /**
    * ISO-3166 alpha-2 country code. Required only when the Application supports multiple regions. Talk to your Partner Manager to confirm whether this applies to you. 
    */
    'country'?: string;
    /**
    * Ignored. Taken from the Xero Bank Account named by `accountId`.
    */
    'accountNumber'?: string;
    /**
    * Ignored. Taken from the Xero Bank Account named by `accountId`.
    */
    'accountName'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountId",
            "baseName": "accountId",
            "type": "string"
        },
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
            "name": "currency",
            "baseName": "currency",
            "type": "string"
        },
        {
            "name": "country",
            "baseName": "country",
            "type": "string"
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
        }    ];

    static getAttributeTypeMap() {
        return ExistingAccountFeedConnection.attributeTypeMap;
    }
}

