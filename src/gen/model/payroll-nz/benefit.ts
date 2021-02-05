
export class Benefit {
    /**
    * The Xero identifier for superannuation
    */
    'id'?: string;
    /**
    * Name of the superannuations
    */
    'name': string;
    /**
    * Superannuations Category type
    */
    'category': Benefit.CategoryEnum;
    /**
    * Xero identifier for Liability Account
    */
    'liabilityAccountId': string;
    /**
    * Xero identifier for Expense Account
    */
    'expenseAccountId': string;
    /**
    * Calculation Type of the superannuation either FixedAmount or PercentageOfTaxableEarnings
    */
    'calculationTypeNZ'?: Benefit.CalculationTypeNZEnum;
    /**
    * Standard amount of the superannuation
    */
    'standardAmount'?: number;
    /**
    * Percentage of Taxable Earnings of the superannuation
    */
    'percentage'?: number;
    /**
    * Company Maximum amount of the superannuation
    */
    'companyMax'?: number;
    /**
    * Identifier of a record is active or not.
    */
    'currentRecord'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "category",
            "baseName": "category",
            "type": "Benefit.CategoryEnum"
        },
        {
            "name": "liabilityAccountId",
            "baseName": "liabilityAccountId",
            "type": "string"
        },
        {
            "name": "expenseAccountId",
            "baseName": "expenseAccountId",
            "type": "string"
        },
        {
            "name": "calculationTypeNZ",
            "baseName": "calculationTypeNZ",
            "type": "Benefit.CalculationTypeNZEnum"
        },
        {
            "name": "standardAmount",
            "baseName": "standardAmount",
            "type": "number"
        },
        {
            "name": "percentage",
            "baseName": "percentage",
            "type": "number"
        },
        {
            "name": "companyMax",
            "baseName": "companyMax",
            "type": "number"
        },
        {
            "name": "currentRecord",
            "baseName": "currentRecord",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return Benefit.attributeTypeMap;
    }
}

export namespace Benefit {
    export enum CategoryEnum {
        KiwiSaver = <any> 'KiwiSaver',
        ComplyingFund = <any> 'ComplyingFund',
        Other = <any> 'Other'
    }
    export enum CalculationTypeNZEnum {
        FixedAmount = <any> 'FixedAmount',
        PercentageOfTaxableEarnings = <any> 'PercentageOfTaxableEarnings'
    }
}
