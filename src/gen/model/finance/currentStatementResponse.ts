
export class CurrentStatementResponse {
    /**
    * Looking at the most recent bank statement, this field indicates the first date which transactions on this statement pertain to. This date is represented in ISO 8601 format.
    */
    'startDate'?: string;
    /**
    * Looking at the most recent bank statement, this field indicates the last date which transactions on this statement pertain to. This date is represented in ISO 8601 format.
    */
    'endDate'?: string;
    /**
    * Looking at the most recent bank statement, this field indicates the balance before the transactions on the statement are applied (note, this is not always populated by the bank in every single instance (~10%)).
    */
    'startBalance'?: number;
    /**
    * Looking at the most recent bank statement, this field indicates the balance after the transactions on the statement are applied (note, this is not always populated by the bank in every single instance (~10%)).
    */
    'endBalance'?: number;
    /**
    * Looking at the most recent bank statement, this field indicates when the document was imported into Xero.  This date is represented in ISO 8601 format.
    */
    'importedDateTimeUtc'?: Date;
    /**
    * Looking at the most recent bank statement, this field indicates the source of the data (direct bank feed, indirect bank feed, file upload, or manual keying).
    */
    'importSourceType'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        }        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "string"
        }        {
            "name": "startBalance",
            "baseName": "startBalance",
            "type": "number"
        }        {
            "name": "endBalance",
            "baseName": "endBalance",
            "type": "number"
        }        {
            "name": "importedDateTimeUtc",
            "baseName": "importedDateTimeUtc",
            "type": "Date"
        }        {
            "name": "importSourceType",
            "baseName": "importSourceType",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return CurrentStatementResponse.attributeTypeMap;
    }
}

