
export class DeductionType {
    /**
    * Name of the earnings rate (max length = 100)
    */
    'name'?: string;
    /**
    * See Accounts
    */
    'accountCode'?: string;
    /**
    * Indicates that this is a pre-tax deduction that will reduce the amount of tax you withhold from an employee.
    */
    'reducesTax'?: boolean;
    /**
    * Most deductions don’t reduce your superannuation guarantee contribution liability, so typically you will not set any value for this.
    */
    'reducesSuper'?: boolean;
    /**
    * Boolean to determine if the deduction type is reportable or exempt from W1
    */
    'isExemptFromW1'?: boolean;
    /**
    * Xero identifier
    */
    'deductionTypeID'?: string;
    /**
    * Last modified timestamp
    */
    'updatedDateUTC'?: Date;
    'deductionCategory'?: DeductionType.DeductionCategoryEnum;
    /**
    * Is the current record
    */
    'currentRecord'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        },
        {
            "name": "accountCode",
            "baseName": "AccountCode",
            "type": "string"
        },
        {
            "name": "reducesTax",
            "baseName": "ReducesTax",
            "type": "boolean"
        },
        {
            "name": "reducesSuper",
            "baseName": "ReducesSuper",
            "type": "boolean"
        },
        {
            "name": "isExemptFromW1",
            "baseName": "IsExemptFromW1",
            "type": "boolean"
        },
        {
            "name": "deductionTypeID",
            "baseName": "DeductionTypeID",
            "type": "string"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "deductionCategory",
            "baseName": "DeductionCategory",
            "type": "DeductionType.DeductionCategoryEnum"
        },
        {
            "name": "currentRecord",
            "baseName": "CurrentRecord",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return DeductionType.attributeTypeMap;
    }
}

export namespace DeductionType {
    export enum DeductionCategoryEnum {
        NONE = <any> 'NONE',
        UNIONFEES = <any> 'UNIONFEES',
        WORKPLACEGIVING = <any> 'WORKPLACEGIVING'
    }
}
