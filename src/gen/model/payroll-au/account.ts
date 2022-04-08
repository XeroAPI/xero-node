import { AccountType } from '././accountType';

export class Account {
    /**
    * Xero identifier for accounts
    */
    'accountID'?: string;
    'type'?: AccountType;
    /**
    * Customer defined account code
    */
    'code'?: string;
    /**
    * Name of account
    */
    'name'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountID",
            "baseName": "AccountID",
            "type": "string"
        }        {
            "name": "type",
            "baseName": "Type",
            "type": "AccountType"
        }        {
            "name": "code",
            "baseName": "Code",
            "type": "string"
        }        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Account.attributeTypeMap;
    }
}

