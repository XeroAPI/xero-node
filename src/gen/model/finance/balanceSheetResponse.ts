import { BalanceSheetAccountGroup } from '././balanceSheetAccountGroup';

export class BalanceSheetResponse {
    /**
    * Balance date of the report
    */
    'balanceDate'?: string;
    'asset'?: BalanceSheetAccountGroup;
    'liability'?: BalanceSheetAccountGroup;
    'equity'?: BalanceSheetAccountGroup;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "balanceDate",
            "baseName": "balanceDate",
            "type": "string"
        },
        {
            "name": "asset",
            "baseName": "asset",
            "type": "BalanceSheetAccountGroup"
        },
        {
            "name": "liability",
            "baseName": "liability",
            "type": "BalanceSheetAccountGroup"
        },
        {
            "name": "equity",
            "baseName": "equity",
            "type": "BalanceSheetAccountGroup"
        }    ];

    static getAttributeTypeMap() {
        return BalanceSheetResponse.attributeTypeMap;
    }
}

