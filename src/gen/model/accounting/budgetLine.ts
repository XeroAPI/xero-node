import { BudgetBalance } from '././budgetBalance';

export class BudgetLine {
    /**
    * See Accounts
    */
    'accountID'?: string;
    /**
    * See Accounts
    */
    'accountCode'?: string;
    'budgetBalances'?: Array<BudgetBalance>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountID",
            "baseName": "AccountID",
            "type": "string"
        },
        {
            "name": "accountCode",
            "baseName": "AccountCode",
            "type": "string"
        },
        {
            "name": "budgetBalances",
            "baseName": "BudgetBalances",
            "type": "Array<BudgetBalance>"
        }    ];

    static getAttributeTypeMap() {
        return BudgetLine.attributeTypeMap;
    }
}

