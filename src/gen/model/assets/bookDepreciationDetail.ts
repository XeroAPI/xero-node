
export class BookDepreciationDetail {
    /**
    * When an asset is disposed, this will be the sell price minus the purchase price if a profit was made.
    */
    'currentCapitalGain'?: number;
    /**
    * When an asset is disposed, this will be the lowest one of sell price or purchase price, minus the current book value.
    */
    'currentGainLoss'?: number;
    /**
    * YYYY-MM-DD
    */
    'depreciationStartDate'?: string;
    /**
    * The value of the asset you want to depreciate, if this is less than the cost of the asset.
    */
    'costLimit'?: number;
    /**
    * The value of the asset remaining when you\'ve fully depreciated it.
    */
    'residualValue'?: number;
    /**
    * All depreciation prior to the current financial year.
    */
    'priorAccumDepreciationAmount'?: number;
    /**
    * All depreciation occurring in the current financial year.
    */
    'currentAccumDepreciationAmount'?: number;
    /**
    * (New Zealand Orgs Only) The portion of capital gain realised from the disposal of a fixed asset that is attributable to its business use.
    */
    'businessUseCapitalGain'?: number;
    /**
    * (New Zealand Orgs Only) Represents the gain or loss from the disposal of the business use portion of a fixed asset. This value records the financial result (profit or loss) related specifically to the asset’s business use.
    */
    'businessUseCurrentGainLoss'?: number;
    /**
    * (New Zealand Orgs Only) The portion of capital gain realised from the disposal of a fixed asset that is attributable to its private (non-business) use.
    */
    'privateUseCapitalGain'?: number;
    /**
    * (New Zealand Orgs Only) Represents the gain or loss from the disposal of the private use portion of a fixed asset. This value records the financial result (profit or loss) related specifically to the asset’s private use.
    */
    'privateUseCurrentGainLoss'?: number;
    /**
    * (New Zealand Orgs Only) The Investment Boost deduction percentage.
    */
    'initialDeductionPercentage'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "currentCapitalGain",
            "baseName": "currentCapitalGain",
            "type": "number"
        },
        {
            "name": "currentGainLoss",
            "baseName": "currentGainLoss",
            "type": "number"
        },
        {
            "name": "depreciationStartDate",
            "baseName": "depreciationStartDate",
            "type": "string"
        },
        {
            "name": "costLimit",
            "baseName": "costLimit",
            "type": "number"
        },
        {
            "name": "residualValue",
            "baseName": "residualValue",
            "type": "number"
        },
        {
            "name": "priorAccumDepreciationAmount",
            "baseName": "priorAccumDepreciationAmount",
            "type": "number"
        },
        {
            "name": "currentAccumDepreciationAmount",
            "baseName": "currentAccumDepreciationAmount",
            "type": "number"
        },
        {
            "name": "businessUseCapitalGain",
            "baseName": "businessUseCapitalGain",
            "type": "number"
        },
        {
            "name": "businessUseCurrentGainLoss",
            "baseName": "businessUseCurrentGainLoss",
            "type": "number"
        },
        {
            "name": "privateUseCapitalGain",
            "baseName": "privateUseCapitalGain",
            "type": "number"
        },
        {
            "name": "privateUseCurrentGainLoss",
            "baseName": "privateUseCurrentGainLoss",
            "type": "number"
        },
        {
            "name": "initialDeductionPercentage",
            "baseName": "initialDeductionPercentage",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return BookDepreciationDetail.attributeTypeMap;
    }
}

