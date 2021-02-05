
export class TrackingCategory {
    /**
    * The Xero identifier for Employee groups tracking category.
    */
    'employeeGroupsTrackingCategoryID'?: string;
    /**
    * The Xero identifier for Timesheet tracking category.
    */
    'timesheetTrackingCategoryID'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "employeeGroupsTrackingCategoryID",
            "baseName": "employeeGroupsTrackingCategoryID",
            "type": "string"
        },
        {
            "name": "timesheetTrackingCategoryID",
            "baseName": "timesheetTrackingCategoryID",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return TrackingCategory.attributeTypeMap;
    }
}

