
export class TrackingOption {
    /**
    * The Xero identifier for a tracking option e.g. ae777a87-5ef3-4fa0-a4f0-d10e1f13073a
    */
    'trackingOptionID'?: string;
    /**
    * The name of the tracking option e.g. Marketing, East (max length = 100)
    */
    'name'?: string;
    /**
    * The status of a tracking option
    */
    'status'?: TrackingOption.StatusEnum;
    /**
    * Filter by a tracking category e.g. 297c2dc5-cc47-4afd-8ec8-74990b8761e9
    */
    'trackingCategoryID'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "trackingOptionID",
            "baseName": "TrackingOptionID",
            "type": "string"
        }        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        }        {
            "name": "status",
            "baseName": "Status",
            "type": "TrackingOption.StatusEnum"
        }        {
            "name": "trackingCategoryID",
            "baseName": "TrackingCategoryID",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return TrackingOption.attributeTypeMap;
    }
}

export namespace TrackingOption {
    export enum StatusEnum {
        Active = <any> 'ACTIVE',
        Archived = <any> 'ARCHIVED',
        Deleted = <any> 'DELETED'
    }
}
