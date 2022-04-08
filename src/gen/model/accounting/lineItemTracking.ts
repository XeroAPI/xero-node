
export class LineItemTracking {
    /**
    * The Xero identifier for a tracking category
    */
    'trackingCategoryID'?: string;
    /**
    * The Xero identifier for a tracking category option
    */
    'trackingOptionID'?: string;
    /**
    * The name of the tracking category
    */
    'name'?: string;
    /**
    * See Tracking Options
    */
    'option'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "trackingCategoryID",
            "baseName": "TrackingCategoryID",
            "type": "string"
        }        {
            "name": "trackingOptionID",
            "baseName": "TrackingOptionID",
            "type": "string"
        }        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        }        {
            "name": "option",
            "baseName": "Option",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return LineItemTracking.attributeTypeMap;
    }
}

