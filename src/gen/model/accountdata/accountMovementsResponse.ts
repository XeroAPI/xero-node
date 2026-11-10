import { AccountMovement } from '././accountMovement';

export class AccountMovementsResponse {
    'accountMovements': Array<AccountMovement>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountMovements",
            "baseName": "accountMovements",
            "type": "Array<AccountMovement>"
        }    ];

    static getAttributeTypeMap() {
        return AccountMovementsResponse.attributeTypeMap;
    }
}

