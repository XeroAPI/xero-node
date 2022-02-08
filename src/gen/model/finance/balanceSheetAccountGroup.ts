import { BalanceSheetAccountType } from '././balanceSheetAccountType';

export class BalanceSheetAccountGroup {
    'accountTypes'?: Array<BalanceSheetAccountType>;
    /**
    * Total value of all the accounts in this type
    */
    'total'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountTypes",
            "baseName": "accountTypes",
            "type": "Array<BalanceSheetAccountType>"
        },
        {
            "name": "total",
            "baseName": "total",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return BalanceSheetAccountGroup.attributeTypeMap;
    }
}

