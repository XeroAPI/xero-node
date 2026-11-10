import { Account } from '././account';
import { LedgerDecimal } from '././ledgerDecimal';

export class AccountBalance {
    /**
    * The account this balance is for.
    */
    'accountId': string;
    /**
    * The date this balance applies to (YYYY-MM-DD).
    */
    'date': string;
    'balance': LedgerDecimal;
    /**
    * Balance as a signed number (positive for debit, negative for credit).
    */
    'signedBalance': number;
    'account': Account;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountId",
            "baseName": "accountId",
            "type": "string"
        },
        {
            "name": "date",
            "baseName": "date",
            "type": "string"
        },
        {
            "name": "balance",
            "baseName": "balance",
            "type": "LedgerDecimal"
        },
        {
            "name": "signedBalance",
            "baseName": "signedBalance",
            "type": "number"
        },
        {
            "name": "account",
            "baseName": "account",
            "type": "Account"
        }    ];

    static getAttributeTypeMap() {
        return AccountBalance.attributeTypeMap;
    }
}

