import { AccountBalance } from '././accountBalance';

export class AccountBalancesResponse {
    'accountBalances': Array<AccountBalance>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountBalances",
            "baseName": "accountBalances",
            "type": "Array<AccountBalance>"
        }    ];

    static getAttributeTypeMap() {
        return AccountBalancesResponse.attributeTypeMap;
    }
}

