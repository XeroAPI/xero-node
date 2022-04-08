
/**
* The tracking category used for employees
*/
export class SettingsTrackingCategoriesEmployeeGroups {
    /**
    * The identifier for the tracking category
    */
    'trackingCategoryID'?: string;
    /**
    * Name of the tracking category
    */
    'trackingCategoryName'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "trackingCategoryID",
            "baseName": "TrackingCategoryID",
            "type": "string"
        },
        {
            "name": "trackingCategoryName",
            "baseName": "TrackingCategoryName",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return SettingsTrackingCategoriesEmployeeGroups.attributeTypeMap;
    }
}

