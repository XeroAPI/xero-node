
export class HistoryRecordResponse {
    /**
    * The type of change recorded against the document
    */
    'changes'?: string;
    /**
    * UTC date that the history record was created
    */
    'dateUTCString'?: string;
    /**
    * UTC date that the history record was created
    */
    'dateUTC'?: Date;
    /**
    * The users first and last name
    */
    'user'?: string;
    /**
    * Description of the change event or transaction
    */
    'details'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "changes",
            "baseName": "changes",
            "type": "string"
        },
        {
            "name": "dateUTCString",
            "baseName": "dateUTCString",
            "type": "string"
        },
        {
            "name": "dateUTC",
            "baseName": "dateUTC",
            "type": "Date"
        },
        {
            "name": "user",
            "baseName": "user",
            "type": "string"
        },
        {
            "name": "details",
            "baseName": "details",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return HistoryRecordResponse.attributeTypeMap;
    }
}

