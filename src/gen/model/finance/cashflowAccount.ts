
export class CashflowAccount {
    /**
    * ID of the account
    */
    'accountId'?: string;
    /**
    * The type of the account. See <a href=\'https://developer.xero.com/documentation/api/types#AccountTypes\'>Account Types</a>
    */
    'accountType'?: string;
    /**
    * The class of the account. See <a href=\'https://developer.xero.com/documentation/api/types#AccountClassTypes\'>Account Class Types</a>
    */
    'accountClass'?: string;
    /**
    * Account code
    */
    'code'?: string;
    /**
    * Account name
    */
    'name'?: string;
    /**
    * Reporting code used for cash flow classification
    */
    'reportingCode'?: string;
    /**
    * Total amount for the account
    */
    'total'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountId",
            "baseName": "accountId",
            "type": "string"
        }        {
            "name": "accountType",
            "baseName": "accountType",
            "type": "string"
        }        {
            "name": "accountClass",
            "baseName": "accountClass",
            "type": "string"
        }        {
            "name": "code",
            "baseName": "code",
            "type": "string"
        }        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        }        {
            "name": "reportingCode",
            "baseName": "reportingCode",
            "type": "string"
        }        {
            "name": "total",
            "baseName": "total",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return CashflowAccount.attributeTypeMap;
    }
}

