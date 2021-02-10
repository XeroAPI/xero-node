
export class LeaveAccrualLine {
    /**
    * Xero identifier for the Leave type.
    */
    'leaveTypeID'?: string;
    /**
    * Leave Accrual number of units
    */
    'numberOfUnits'?: number;
    /**
    * If you want to auto calculate leave.
    */
    'autoCalculate'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "leaveTypeID",
            "baseName": "LeaveTypeID",
            "type": "string"
        },
        {
            "name": "numberOfUnits",
            "baseName": "NumberOfUnits",
            "type": "number"
        },
        {
            "name": "autoCalculate",
            "baseName": "AutoCalculate",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return LeaveAccrualLine.attributeTypeMap;
    }
}

