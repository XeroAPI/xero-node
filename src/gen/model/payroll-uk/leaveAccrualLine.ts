
export class LeaveAccrualLine {
    /**
    * Xero identifier for the Leave type
    */
    'leaveTypeID'?: string;
    /**
    * Leave accrual number of units
    */
    'numberOfUnits'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "leaveTypeID",
            "baseName": "leaveTypeID",
            "type": "string"
        },
        {
            "name": "numberOfUnits",
            "baseName": "numberOfUnits",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return LeaveAccrualLine.attributeTypeMap;
    }
}

