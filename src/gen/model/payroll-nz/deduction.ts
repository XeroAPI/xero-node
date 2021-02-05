
export class Deduction {
    /**
    * The Xero identifier for Deduction
    */
    'deductionId'?: string;
    /**
    * Name of the deduction
    */
    'deductionName': string;
    /**
    * Deduction Category type
    */
    'deductionCategory': Deduction.DeductionCategoryEnum;
    /**
    * Xero identifier for Liability Account
    */
    'liabilityAccountId': string;
    /**
    * Identifier of a record is active or not.
    */
    'currentRecord'?: boolean;
    /**
    * Standard amount of the deduction.
    */
    'standardAmount'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "deductionId",
            "baseName": "deductionId",
            "type": "string"
        },
        {
            "name": "deductionName",
            "baseName": "deductionName",
            "type": "string"
        },
        {
            "name": "deductionCategory",
            "baseName": "deductionCategory",
            "type": "Deduction.DeductionCategoryEnum"
        },
        {
            "name": "liabilityAccountId",
            "baseName": "liabilityAccountId",
            "type": "string"
        },
        {
            "name": "currentRecord",
            "baseName": "currentRecord",
            "type": "boolean"
        },
        {
            "name": "standardAmount",
            "baseName": "standardAmount",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return Deduction.attributeTypeMap;
    }
}

export namespace Deduction {
    export enum DeductionCategoryEnum {
        PayrollGiving = <any> 'PayrollGiving',
        KiwiSaverVoluntaryContributions = <any> 'KiwiSaverVoluntaryContributions',
        Superannuation = <any> 'Superannuation',
        NzOther = <any> 'NzOther'
    }
}
