import { StatutoryDeductionCategory } from '././statutoryDeductionCategory';

export class StatutoryDeduction {
    /**
    * The Xero identifier for earnings order
    */
    'id'?: string;
    /**
    * Name of the earnings order
    */
    'name'?: string;
    'statutoryDeductionCategory'?: StatutoryDeductionCategory;
    /**
    * Xero identifier for Liability Account
    */
    'liabilityAccountId'?: string;
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
            "name": "statutoryDeductionCategory",
            "baseName": "statutoryDeductionCategory",
            "type": "StatutoryDeductionCategory"
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
        }    ];

    static getAttributeTypeMap() {
        return StatutoryDeduction.attributeTypeMap;
    }
}

