
export class FeedConnectionToDelete {
    /**
    * The Feed Connection to terminate. Required; an all-zeros GUID is treated as though the field were absent. `accountToken`, `accountType` and `country`, which V1 accepted here, are not supported. 
    */
    'id': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return FeedConnectionToDelete.attributeTypeMap;
    }
}

