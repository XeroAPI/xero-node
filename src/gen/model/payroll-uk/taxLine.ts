
export class TaxLine {
    /**
    * Xero identifier for payroll tax line
    */
    'taxLineID'?: string;
    /**
    * Tax line description
    */
    'description'?: string;
    /**
    * Identifies if the amount is paid for by the employee or employer. True if employer pays the tax
    */
    'isEmployerTax'?: boolean;
    /**
    * The amount of the tax line
    */
    'amount'?: number;
    /**
    * Tax type ID
    */
    'globalTaxTypeID'?: string;
    /**
    * Identifies if the tax line is a manual adjustment
    */
    'manualAdjustment'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "taxLineID",
            "baseName": "taxLineID",
            "type": "string"
        }        {
            "name": "description",
            "baseName": "description",
            "type": "string"
        }        {
            "name": "isEmployerTax",
            "baseName": "isEmployerTax",
            "type": "boolean"
        }        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        }        {
            "name": "globalTaxTypeID",
            "baseName": "globalTaxTypeID",
            "type": "string"
        }        {
            "name": "manualAdjustment",
            "baseName": "manualAdjustment",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return TaxLine.attributeTypeMap;
    }
}

