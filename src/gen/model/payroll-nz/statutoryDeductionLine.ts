
export class StatutoryDeductionLine {
    /**
    * Xero identifier for payroll statutory deduction type
    */
    'statutoryDeductionTypeID'?: string;
    /**
    * The amount of the statutory deduction line
    */
    'amount'?: number;
    /**
    * Fixed Amount
    */
    'fixedAmount'?: number;
    /**
    * Identifies if the tax line is a manual adjustment
    */
    'manualAdjustment'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "statutoryDeductionTypeID",
            "baseName": "statutoryDeductionTypeID",
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
            "name": "manualAdjustment",
            "baseName": "manualAdjustment",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return StatutoryDeductionLine.attributeTypeMap;
    }
}

