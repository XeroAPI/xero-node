import { BookDepreciationSetting } from '././bookDepreciationSetting';

export class AssetType {
    /**
    * Xero generated unique identifier for asset types
    */
    'assetTypeId'?: string;
    /**
    * The name of the asset type
    */
    'assetTypeName': string;
    /**
    * The asset account for fixed assets of this type
    */
    'fixedAssetAccountId'?: string;
    /**
    * The expense account for the depreciation of fixed assets of this type
    */
    'depreciationExpenseAccountId'?: string;
    /**
    * The account for accumulated depreciation of fixed assets of this type
    */
    'accumulatedDepreciationAccountId'?: string;
    'bookDepreciationSetting': BookDepreciationSetting;
    /**
    * All asset types that have accumulated depreciation for any assets that use them are deemed ‘locked’ and cannot be removed.
    */
    'locks'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "assetTypeId",
            "baseName": "assetTypeId",
            "type": "string"
        },
        {
            "name": "assetTypeName",
            "baseName": "assetTypeName",
            "type": "string"
        },
        {
            "name": "fixedAssetAccountId",
            "baseName": "fixedAssetAccountId",
            "type": "string"
        },
        {
            "name": "depreciationExpenseAccountId",
            "baseName": "depreciationExpenseAccountId",
            "type": "string"
        },
        {
            "name": "accumulatedDepreciationAccountId",
            "baseName": "accumulatedDepreciationAccountId",
            "type": "string"
        },
        {
            "name": "bookDepreciationSetting",
            "baseName": "bookDepreciationSetting",
            "type": "BookDepreciationSetting"
        },
        {
            "name": "locks",
            "baseName": "locks",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return AssetType.attributeTypeMap;
    }
}

