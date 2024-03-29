import { LeaveCategoryCode } from '././leaveCategoryCode';

export class LeaveType {
    /**
    * Name of the earnings rate (max length = 100)
    */
    'name'?: string;
    /**
    * The type of units by which leave entitlements are normally tracked. These are typically the same as the type of units used for the employee’s ordinary earnings rate
    */
    'typeOfUnits'?: string;
    /**
    * Xero identifier
    */
    'leaveTypeID'?: string;
    /**
    * The number of units the employee is entitled to each year
    */
    'normalEntitlement'?: number;
    /**
    * Enter an amount here if your organisation pays an additional percentage on top of ordinary earnings when your employees take leave (typically 17.5%)
    */
    'leaveLoadingRate'?: number;
    /**
    * Last modified timestamp
    */
    'updatedDateUTC'?: Date;
    /**
    * Set this to indicate that an employee will be paid when taking this type of leave
    */
    'isPaidLeave'?: boolean;
    /**
    * Set this if you want a balance for this leave type to be shown on your employee’s payslips
    */
    'showOnPayslip'?: boolean;
    /**
    * Is the current record
    */
    'currentRecord'?: boolean;
    'leaveCategoryCode'?: LeaveCategoryCode;
    /**
    * Set this to indicate that the leave type is exempt from superannuation guarantee contribution
    */
    'sGCExempt'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        },
        {
            "name": "typeOfUnits",
            "baseName": "TypeOfUnits",
            "type": "string"
        },
        {
            "name": "leaveTypeID",
            "baseName": "LeaveTypeID",
            "type": "string"
        },
        {
            "name": "normalEntitlement",
            "baseName": "NormalEntitlement",
            "type": "number"
        },
        {
            "name": "leaveLoadingRate",
            "baseName": "LeaveLoadingRate",
            "type": "number"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "isPaidLeave",
            "baseName": "IsPaidLeave",
            "type": "boolean"
        },
        {
            "name": "showOnPayslip",
            "baseName": "ShowOnPayslip",
            "type": "boolean"
        },
        {
            "name": "currentRecord",
            "baseName": "CurrentRecord",
            "type": "boolean"
        },
        {
            "name": "leaveCategoryCode",
            "baseName": "LeaveCategoryCode",
            "type": "LeaveCategoryCode"
        },
        {
            "name": "sGCExempt",
            "baseName": "SGCExempt",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return LeaveType.attributeTypeMap;
    }
}

