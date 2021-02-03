
export class LeaveEarningsLine {
    /**
    * Xero identifier for payroll earnings line
    */
    'earningsLineID'?: string;
    /**
    * Xero identifier for payroll leave earnings rate
    */
    'earningsRateID'?: string;
    /**
    * name of earnings rate for display in UI
    */
    'displayName'?: string;
    /**
    * Rate per unit for leave earnings line
    */
    'ratePerUnit'?: number;
    /**
    * Leave earnings number of units
    */
    'numberOfUnits'?: number;
    /**
    * Leave earnings fixed amount. Only applicable if the EarningsRate RateType is Fixed
    */
    'fixedAmount'?: number;
    /**
    * The amount of the earnings line.
    */
    'amount'?: number;
    /**
    * Identifies if the leave earnings is taken from the timesheet. False for leave earnings line
    */
    'isLinkedToTimesheet'?: boolean;
    /**
    * Identifies if the earnings is using an average daily pay rate
    */
    'isAverageDailyPayRate'?: boolean;
    /**
    * Flag to identify whether the earnings line is system generated or not.
    */
    'isSystemGenerated'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "earningsLineID",
            "baseName": "earningsLineID",
            "type": "string"
        },
        {
            "name": "earningsRateID",
            "baseName": "earningsRateID",
            "type": "string"
        },
        {
            "name": "displayName",
            "baseName": "displayName",
            "type": "string"
        },
        {
            "name": "ratePerUnit",
            "baseName": "ratePerUnit",
            "type": "number"
        },
        {
            "name": "numberOfUnits",
            "baseName": "numberOfUnits",
            "type": "number"
        },
        {
            "name": "fixedAmount",
            "baseName": "fixedAmount",
            "type": "number"
        },
        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        },
        {
            "name": "isLinkedToTimesheet",
            "baseName": "isLinkedToTimesheet",
            "type": "boolean"
        },
        {
            "name": "isAverageDailyPayRate",
            "baseName": "isAverageDailyPayRate",
            "type": "boolean"
        },
        {
            "name": "isSystemGenerated",
            "baseName": "isSystemGenerated",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return LeaveEarningsLine.attributeTypeMap;
    }
}

