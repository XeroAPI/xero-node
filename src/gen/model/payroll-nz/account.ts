
export class Account {
    /**
    * The Xero identifier for Settings.
    */
    'accountID'?: string;
    /**
    * The assigned AccountType
    */
    'type'?: Account.TypeEnum;
    /**
    * A unique 3 digit number for each Account
    */
    'code'?: string;
    /**
    * Name of the Account.
    */
    'name'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountID",
            "baseName": "accountID",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "Account.TypeEnum"
        },
        {
            "name": "code",
            "baseName": "code",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Account.attributeTypeMap;
    }
}

export namespace Account {
    export enum TypeEnum {
        PAYELIABILITY = <any> 'PAYELIABILITY',
        WAGESPAYABLE = <any> 'WAGESPAYABLE',
        WAGESEXPENSE = <any> 'WAGESEXPENSE',
        BANK = <any> 'BANK'
    }
}
