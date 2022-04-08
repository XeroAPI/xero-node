
export class BenefitLine {
    /**
    * Xero identifier for payroll benefit type
    */
    'benefitTypeID'?: string;
    /**
    * Benefit display name
    */
    'displayName'?: string;
    /**
    * The amount of the benefit line.
    */
    'amount'?: number;
    /**
    * Benefit fixed amount
    */
    'fixedAmount'?: number;
    /**
    * Benefit rate percentage
    */
    'percentage'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "benefitTypeID",
            "baseName": "benefitTypeID",
            "type": "string"
        }        {
            "name": "displayName",
            "baseName": "displayName",
            "type": "string"
        }        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        }        {
            "name": "fixedAmount",
            "baseName": "fixedAmount",
            "type": "number"
        }        {
            "name": "percentage",
            "baseName": "percentage",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return BenefitLine.attributeTypeMap;
    }
}

