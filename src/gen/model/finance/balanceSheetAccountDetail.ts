
export class BalanceSheetAccountDetail {
    /**
    * Accounting code
    */
    'code'?: string;
    /**
    * ID of the account
    */
    'accountID'?: string;
    /**
    * Account name
    */
    'name'?: string;
    /**
    * Reporting code
    */
    'reportingCode'?: string;
    /**
    * Total movement on this account
    */
    'total'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "code",
            "baseName": "code",
            "type": "string"
        }        {
            "name": "accountID",
            "baseName": "accountID",
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
        return BalanceSheetAccountDetail.attributeTypeMap;
    }
}

