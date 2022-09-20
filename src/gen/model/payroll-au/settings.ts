import { Account } from '././account';
import { SettingsTrackingCategories } from '././settingsTrackingCategories';

export class Settings {
    /**
    * Payroll Account details for SuperExpense, SuperLiabilty, WagesExpense, PAYGLiability & WagesPayable.
    */
    'accounts'?: Array<Account>;
    'trackingCategories'?: SettingsTrackingCategories;
    /**
    * Number of days in the Payroll year
    */
    'daysInPayrollYear'?: number;
    /**
    * Indicates if the organisation has been enabled for STP Phase 2 editing of employees.
    */
    'employeesAreSTP2'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accounts",
            "baseName": "Accounts",
            "type": "Array<Account>"
        },
        {
            "name": "trackingCategories",
            "baseName": "TrackingCategories",
            "type": "SettingsTrackingCategories"
        },
        {
            "name": "daysInPayrollYear",
            "baseName": "DaysInPayrollYear",
            "type": "number"
        },
        {
            "name": "employeesAreSTP2",
            "baseName": "EmployeesAreSTP2",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return Settings.attributeTypeMap;
    }
}

