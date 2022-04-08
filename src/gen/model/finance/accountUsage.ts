
export class AccountUsage {
    /**
    * The month this usage item contains data for
    */
    'month'?: string;
    /**
    * The account this usage item contains data for
    */
    'accountId'?: string;
    /**
    * The currency code this usage item contains data for
    */
    'currencyCode'?: string;
    /**
    * Total received
    */
    'totalReceived'?: number;
    /**
    * Count of received
    */
    'countReceived'?: number;
    /**
    * Total paid
    */
    'totalPaid'?: number;
    /**
    * Count of paid
    */
    'countPaid'?: number;
    /**
    * Total value of manual journals
    */
    'totalManualJournal'?: number;
    /**
    * Count of manual journals
    */
    'countManualJournal'?: number;
    /**
    * The name of the account
    */
    'accountName'?: string;
    /**
    * Shown if set
    */
    'reportingCode'?: string;
    /**
    * Shown if set
    */
    'reportingCodeName'?: string;
    /**
    * Last modified date UTC format
    */
    'reportCodeUpdatedDateUtc'?: Date;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "month",
            "baseName": "month",
            "type": "string"
        }        {
            "name": "accountId",
            "baseName": "accountId",
            "type": "string"
        }        {
            "name": "currencyCode",
            "baseName": "currencyCode",
            "type": "string"
        }        {
            "name": "totalReceived",
            "baseName": "totalReceived",
            "type": "number"
        }        {
            "name": "countReceived",
            "baseName": "countReceived",
            "type": "number"
        }        {
            "name": "totalPaid",
            "baseName": "totalPaid",
            "type": "number"
        }        {
            "name": "countPaid",
            "baseName": "countPaid",
            "type": "number"
        }        {
            "name": "totalManualJournal",
            "baseName": "totalManualJournal",
            "type": "number"
        }        {
            "name": "countManualJournal",
            "baseName": "countManualJournal",
            "type": "number"
        }        {
            "name": "accountName",
            "baseName": "accountName",
            "type": "string"
        }        {
            "name": "reportingCode",
            "baseName": "reportingCode",
            "type": "string"
        }        {
            "name": "reportingCodeName",
            "baseName": "reportingCodeName",
            "type": "string"
        }        {
            "name": "reportCodeUpdatedDateUtc",
            "baseName": "reportCodeUpdatedDateUtc",
            "type": "Date"
        }    ];

    static getAttributeTypeMap() {
        return AccountUsage.attributeTypeMap;
    }
}

