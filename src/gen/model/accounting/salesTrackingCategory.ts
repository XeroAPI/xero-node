
export class SalesTrackingCategory {
    /**
    * The default sales tracking category name for contacts
    */
    'trackingCategoryName'?: string;
    /**
    * The default purchase tracking category name for contacts
    */
    'trackingOptionName'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "trackingCategoryName",
            "baseName": "TrackingCategoryName",
            "type": "string"
        }        {
            "name": "trackingOptionName",
            "baseName": "TrackingOptionName",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return SalesTrackingCategory.attributeTypeMap;
    }
}

