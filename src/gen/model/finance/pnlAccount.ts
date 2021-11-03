
export class PnlAccount {
    /**
    * ID of the account
    */
    'accountID'?: string;
    /**
    * The type of the account. See <a href=\'https://developer.xero.com/documentation/api/types#AccountTypes\'>Account Types</a>
    */
    'accountType'?: string;
    /**
    * Account code
    */
    'code'?: string;
    /**
    * Account name
    */
    'name'?: string;
    /**
    * Reporting code (Shown if set)
    */
    'reportingCode'?: string;
    /**
    * Total movement on this account
    */
    'total'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountID",
            "baseName": "accountID",
            "type": "string"
        },
        {
            "name": "accountType",
            "baseName": "accountType",
            "type": "string"
        },
        {
            "name": "code",
            "baseName": "code",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "reportingCode",
            "baseName": "reportingCode",
            "type": "string"
        },
        {
            "name": "total",
            "baseName": "total",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return PnlAccount.attributeTypeMap;
    }
}

