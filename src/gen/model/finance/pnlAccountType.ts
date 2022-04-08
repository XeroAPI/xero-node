import { PnlAccount } from '././pnlAccount';

export class PnlAccountType {
    /**
    * Total movement on this account type
    */
    'total'?: number;
    /**
    * Name of this account type, it will be either Trading Income or Other Income for Revenue section / Direct Cost or Operating Expenses for Expense section
    */
    'title'?: string;
    /**
    * A list of the movement on each account detail during the query period. Refer to the account detail element below
    */
    'accounts'?: Array<PnlAccount>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "total",
            "baseName": "total",
            "type": "number"
        }        {
            "name": "title",
            "baseName": "title",
            "type": "string"
        }        {
            "name": "accounts",
            "baseName": "accounts",
            "type": "Array<PnlAccount>"
        }    ];

    static getAttributeTypeMap() {
        return PnlAccountType.attributeTypeMap;
    }
}

