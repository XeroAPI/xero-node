
export class DeductionLine {
    /**
    * Xero identifier for payroll deduction
    */
    'deductionTypeID'?: string;
    /**
    * The amount of the deduction line
    */
    'amount'?: number;
    /**
    * Identifies if the deduction is subject to tax
    */
    'subjectToTax'?: boolean;
    /**
    * Deduction rate percentage
    */
    'percentage'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "deductionTypeID",
            "baseName": "deductionTypeID",
            "type": "string"
        }        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        }        {
            "name": "subjectToTax",
            "baseName": "subjectToTax",
            "type": "boolean"
        }        {
            "name": "percentage",
            "baseName": "percentage",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return DeductionLine.attributeTypeMap;
    }
}

