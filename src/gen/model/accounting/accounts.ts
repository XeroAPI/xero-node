import { Account } from '././account';

export class Accounts {
    'accounts'?: Array<Account>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accounts",
            "baseName": "Accounts",
            "type": "Array<Account>"
        }    ];

    static getAttributeTypeMap() {
        return Accounts.attributeTypeMap;
    }
}

