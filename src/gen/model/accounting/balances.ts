import { AccountsPayable } from '././accountsPayable';
import { AccountsReceivable } from '././accountsReceivable';

/**
* The raw AccountsReceivable(sales invoices) and AccountsPayable(bills) outstanding and overdue amounts, not converted to base currency (read only)
*/
export class Balances {
    'accountsReceivable'?: AccountsReceivable;
    'accountsPayable'?: AccountsPayable;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountsReceivable",
            "baseName": "AccountsReceivable",
            "type": "AccountsReceivable"
        }        {
            "name": "accountsPayable",
            "baseName": "AccountsPayable",
            "type": "AccountsPayable"
        }    ];

    static getAttributeTypeMap() {
        return Balances.attributeTypeMap;
    }
}

