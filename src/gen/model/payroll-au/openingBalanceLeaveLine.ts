
export class OpeningBalanceLeaveLine {
    /**
    * Xero leave type identifier
    */
    'leaveTypeID'?: string;
    /**
    * Number of units for leave line.
    */
    'numberOfUnits'?: number;

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
        }    ];

    static getAttributeTypeMap() {
        return OpeningBalanceLeaveLine.attributeTypeMap;
    }
}

