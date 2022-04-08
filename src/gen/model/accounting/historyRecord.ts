
export class HistoryRecord {
    /**
    * details
    */
    'details'?: string;
    /**
    * Name of branding theme
    */
    'changes'?: string;
    /**
    * has a value of 0
    */
    'user'?: string;
    /**
    * UTC timestamp of creation date of branding theme
    */
    'dateUTC'?: Date;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "details",
            "baseName": "Details",
            "type": "string"
        }        {
            "name": "changes",
            "baseName": "Changes",
            "type": "string"
        }        {
            "name": "user",
            "baseName": "User",
            "type": "string"
        }        {
            "name": "dateUTC",
            "baseName": "DateUTC",
            "type": "Date"
        }    ];

    static getAttributeTypeMap() {
        return HistoryRecord.attributeTypeMap;
    }
}

