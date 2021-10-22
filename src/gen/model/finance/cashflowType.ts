import { CashflowAccount } from '././cashflowAccount';

export class CashflowType {
    /**
    * Name of the activity
    */
    'name'?: string;
    /**
    * Total value of the activity
    */
    'total'?: number;
    /**
    * List of the accounts in this activity
    */
    'accounts'?: Array<CashflowAccount>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "total",
            "baseName": "total",
            "type": "number"
        },
        {
            "name": "accounts",
            "baseName": "accounts",
            "type": "Array<CashflowAccount>"
        }    ];

    static getAttributeTypeMap() {
        return CashflowType.attributeTypeMap;
    }
}

