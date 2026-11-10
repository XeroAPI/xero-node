
export class TransactionAccount {
    'id': string;
    'code'?: string;
    'name': string;
    '_class': TransactionAccount.ClassEnum;
    /**
    * Account type (e.g. `BANK`, `CURRENT`). Reported as `INVENTORY` for inventory asset accounts, regardless of the account\'s underlying type. 
    */
    'type': string;
    'status': TransactionAccount.StatusEnum;
    /**
    * System account code, or `NONE` if the account has no system account code.
    */
    'systemAccountCode': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
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
        },
        {
            "name": "_class",
            "baseName": "class",
            "type": "TransactionAccount.ClassEnum"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "TransactionAccount.StatusEnum"
        },
        {
            "name": "systemAccountCode",
            "baseName": "systemAccountCode",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return TransactionAccount.attributeTypeMap;
    }
}

export namespace TransactionAccount {
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
