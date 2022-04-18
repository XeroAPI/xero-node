
export class LineItemResponse {
    /**
    * Xero Identifier of account
    */
    'accountId'?: string;
    /**
    * Shown if set
    */
    'reportingCode'?: string;
    /**
    * Amount of line item
    */
    'lineAmount'?: number;
    /**
    * Account type
    */
    'accountType'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountId",
            "baseName": "accountId",
            "type": "string"
        },
        {
            "name": "reportingCode",
            "baseName": "reportingCode",
            "type": "string"
        },
        {
            "name": "lineAmount",
            "baseName": "lineAmount",
            "type": "number"
        },
        {
            "name": "accountType",
            "baseName": "accountType",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return LineItemResponse.attributeTypeMap;
    }
}

