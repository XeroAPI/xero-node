import { AccountType } from '././accountType';

/**
* A Feed Connection as Xero records it.
*/
export class FeedConnection {
    /**
    * Xero\'s identifier for the Feed Connection.
    */
    'id'?: string;
    /**
    * The financial institute\'s identifier for the account.
    */
    'accountToken'?: string;
    'accountType'?: AccountType;
    /**
    * The account number the feed is connected to.
    */
    'accountNumber'?: string;
    /**
    * The name of the Xero Bank Account.
    */
    'accountName'?: string;
    /**
    * Xero\'s identifier for the Xero Bank Account.
    */
    'accountId'?: string;
    /**
    * ISO-4217 currency code.
    */
    'currency'?: string;
    /**
    * ISO-3166 alpha-2 country code.
    */
    'country'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
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
            "name": "accountId",
            "baseName": "accountId",
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
        return FeedConnection.attributeTypeMap;
    }
}

