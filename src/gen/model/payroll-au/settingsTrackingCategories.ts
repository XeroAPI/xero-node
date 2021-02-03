import { SettingsTrackingCategoriesEmployeeGroups } from '././settingsTrackingCategoriesEmployeeGroups';
import { SettingsTrackingCategoriesTimesheetCategories } from '././settingsTrackingCategoriesTimesheetCategories';

/**
* Tracking categories for Employees and Timesheets
*/
export class SettingsTrackingCategories {
    'employeeGroups'?: SettingsTrackingCategoriesEmployeeGroups;
    'timesheetCategories'?: SettingsTrackingCategoriesTimesheetCategories;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "employeeGroups",
            "baseName": "EmployeeGroups",
            "type": "SettingsTrackingCategoriesEmployeeGroups"
        },
        {
            "name": "timesheetCategories",
            "baseName": "TimesheetCategories",
            "type": "SettingsTrackingCategoriesTimesheetCategories"
        }    ];

    static getAttributeTypeMap() {
        return SettingsTrackingCategories.attributeTypeMap;
    }
}

