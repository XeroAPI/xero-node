
export class Account {
    'code'?: string;
    'name': string;
    '_class': Account.ClassEnum;
    /**
    * Account type (e.g. `BANK`, `CURRENT`). Reported as `INVENTORY` for inventory asset accounts, regardless of the account\'s underlying type. 
    */
    'type': string;
    'status': Account.StatusEnum;
    /**
    * System account code, or `NONE` if the account has no system account code.
    */
    'systemAccountCode': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "code",
            "baseName": "code",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "_class",
            "baseName": "class",
            "type": "Account.ClassEnum"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "Account.StatusEnum"
        },
        {
            "name": "systemAccountCode",
            "baseName": "systemAccountCode",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Account.attributeTypeMap;
    }
}

export namespace Account {
    export enum ClassEnum {
        ASSET = <any> 'ASSET',
        LIABILITY = <any> 'LIABILITY',
        EQUITY = <any> 'EQUITY',
        REVENUE = <any> 'REVENUE',
        EXPENSE = <any> 'EXPENSE'
    }
    export enum StatusEnum {
        ACTIVE = <any> 'ACTIVE',
        ARCHIVED = <any> 'ARCHIVED',
        DELETED = <any> 'DELETED'
    }
}
