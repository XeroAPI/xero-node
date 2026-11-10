
export class TrackingItemDetails {
    'categoryName': string;
    'optionId': string;
    'optionName': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "categoryName",
            "baseName": "categoryName",
            "type": "string"
        },
        {
            "name": "optionId",
            "baseName": "optionId",
            "type": "string"
        },
        {
            "name": "optionName",
            "baseName": "optionName",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return TrackingItemDetails.attributeTypeMap;
    }
}

