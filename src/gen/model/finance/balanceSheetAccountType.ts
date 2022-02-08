import { BalanceSheetAccountDetail } from '././balanceSheetAccountDetail';

export class BalanceSheetAccountType {
    /**
    * The type of the account. See <a href=\'https://developer.xero.com/documentation/api/types#AccountTypes\'>Account Types</a>
    */
    'accountType'?: string;
    /**
    * A list of all accounts of this type. Refer to the Account section below for each account element detail.
    */
    'accounts'?: Array<BalanceSheetAccountDetail>;
    /**
    * Total value of all the accounts in this type
    */
    'total'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountType",
            "baseName": "accountType",
            "type": "string"
        },
        {
            "name": "accounts",
            "baseName": "accounts",
            "type": "Array<BalanceSheetAccountDetail>"
        },
        {
            "name": "total",
            "baseName": "total",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return BalanceSheetAccountType.attributeTypeMap;
    }
}

