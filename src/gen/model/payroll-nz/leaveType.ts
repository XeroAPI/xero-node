
export class LeaveType {
    /**
    * Xero unique identifier for the leave type
    */
    'leaveTypeID'?: string;
    /**
    * Name of the leave type
    */
    'name': string;
    /**
    * Indicate that an employee will be paid when taking this type of leave
    */
    'isPaidLeave': boolean;
    /**
    * Indicate that a balance for this leave type to be shown on the employee’s payslips
    */
    'showOnPayslip': boolean;
    /**
    * UTC timestamp of last update to the leave type note
    */
    'updatedDateUTC'?: Date;
    /**
    * Shows whether the leave type is active or not
    */
    'isActive'?: boolean;
    /**
    * The type of units to be paid for the leave type
    */
    'typeOfUnits'?: string;
    /**
    * The type of units to be accrued for the leave type
    */
    'typeOfUnitsToAccrue'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "leaveTypeID",
            "baseName": "leaveTypeID",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "isPaidLeave",
            "baseName": "isPaidLeave",
            "type": "boolean"
        },
        {
            "name": "showOnPayslip",
            "baseName": "showOnPayslip",
            "type": "boolean"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "updatedDateUTC",
            "type": "Date"
        },
        {
            "name": "isActive",
            "baseName": "isActive",
            "type": "boolean"
        },
        {
            "name": "typeOfUnits",
            "baseName": "typeOfUnits",
            "type": "string"
        },
        {
            "name": "typeOfUnitsToAccrue",
            "baseName": "typeOfUnitsToAccrue",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return LeaveType.attributeTypeMap;
    }
}

