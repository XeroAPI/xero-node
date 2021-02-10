
export class SuperannuationLine {
    /**
    * Xero identifier for payroll superannuation type
    */
    'superannuationTypeID'?: string;
    /**
    * Benefit display name
    */
    'displayName'?: string;
    /**
    * The amount of the superannuation line
    */
    'amount'?: number;
    /**
    * Superannuation fixed amount
    */
    'fixedAmount'?: number;
    /**
    * Superannuation rate percentage
    */
    'percentage'?: number;
    /**
    * manual adjustment made
    */
    'manualAdjustment'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "superannuationTypeID",
            "baseName": "superannuationTypeID",
            "type": "string"
        },
        {
            "name": "displayName",
            "baseName": "displayName",
            "type": "string"
        },
        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        },
        {
            "name": "fixedAmount",
            "baseName": "fixedAmount",
            "type": "number"
        },
        {
            "name": "percentage",
            "baseName": "percentage",
            "type": "number"
        },
        {
            "name": "manualAdjustment",
            "baseName": "manualAdjustment",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return SuperannuationLine.attributeTypeMap;
    }
}

