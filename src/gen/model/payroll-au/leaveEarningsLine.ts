
export class LeaveEarningsLine {
    /**
    * Xero identifier
    */
    'earningsRateID'?: string;
    /**
    * Rate per unit of the EarningsLine.
    */
    'ratePerUnit'?: number;
    /**
    * Earnings rate number of units.
    */
    'numberOfUnits'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "earningsRateID",
            "baseName": "EarningsRateID",
            "type": "string"
        },
        {
            "name": "ratePerUnit",
            "baseName": "RatePerUnit",
            "type": "number"
        },
        {
            "name": "numberOfUnits",
            "baseName": "NumberOfUnits",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return LeaveEarningsLine.attributeTypeMap;
    }
}

