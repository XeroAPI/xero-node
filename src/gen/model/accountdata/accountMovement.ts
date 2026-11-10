import { Account } from '././account';
import { AccountingDateRange } from '././accountingDateRange';
import { LedgerDecimal } from '././ledgerDecimal';

export class AccountMovement {
    /**
    * The account this movement is for.
    */
    'accountId': string;
    'dateRange': AccountingDateRange;
    /**
    * Total debits posted to this account within the date range.
    */
    'debits': number;
    /**
    * Total credits posted to this account within the date range.
    */
    'credits': number;
    'movement': LedgerDecimal;
    /**
    * Movement as a signed number (positive for debit, negative for credit).
    */
    'signedMovement': number;
    /**
    * Total tax debits within the date range. Omitted from the response when tax values are not available.
    */
    'taxDebits'?: number;
    /**
    * Total tax credits within the date range. Omitted from the response when tax values are not available.
    */
    'taxCredits'?: number;
    /**
    * Tax movement as a signed number (positive for debit, negative for credit). Omitted from the response when tax values are not available.
    */
    'signedTaxMovement'?: number;
    'account': Account;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountId",
            "baseName": "accountId",
            "type": "string"
        },
        {
            "name": "dateRange",
            "baseName": "dateRange",
            "type": "AccountingDateRange"
        },
        {
            "name": "debits",
            "baseName": "debits",
            "type": "number"
        },
        {
            "name": "credits",
            "baseName": "credits",
            "type": "number"
        },
        {
            "name": "movement",
            "baseName": "movement",
            "type": "LedgerDecimal"
        },
        {
            "name": "signedMovement",
            "baseName": "signedMovement",
            "type": "number"
        },
        {
            "name": "taxDebits",
            "baseName": "taxDebits",
            "type": "number"
        },
        {
            "name": "taxCredits",
            "baseName": "taxCredits",
            "type": "number"
        },
        {
            "name": "signedTaxMovement",
            "baseName": "signedTaxMovement",
            "type": "number"
        },
        {
            "name": "account",
            "baseName": "account",
            "type": "Account"
        }    ];

    static getAttributeTypeMap() {
        return AccountMovement.attributeTypeMap;
    }
}

