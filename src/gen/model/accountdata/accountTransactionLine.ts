import { LedgerDecimal } from '././ledgerDecimal';
import { LineSource } from '././lineSource';
import { LineTaxRate } from '././lineTaxRate';
import { TrackingItemDetails } from '././trackingItemDetails';
import { TransactionAccount } from '././transactionAccount';

export class AccountTransactionLine {
    /**
    * Unique journal number for this transaction.
    */
    'journalNumber': number;
    /**
    * Accounting date of the transaction (YYYY-MM-DD).
    */
    'journalDate': string;
    /**
    * Line description, falling back to the journal narration. Empty if neither is set.
    */
    'description': string;
    'account': TransactionAccount;
    'netAmount': LedgerDecimal;
    /**
    * Net amount as a signed number (positive for debit, negative for credit).
    */
    'signedNetAmount'?: number;
    'taxAmount'?: LedgerDecimal;
    /**
    * Tax amount as a signed number (positive for debit, negative for credit).
    */
    'signedTaxAmount'?: number;
    'source': LineSource;
    'taxRate': LineTaxRate;
    /**
    * Present only when `include=trackingCategories` was requested, and omitted otherwise. Keys are tracking category IDs (UUIDs); values describe the selected tracking option. The object is empty when the line has no tracking. 
    */
    'trackingCategories'?: { [key: string]: TrackingItemDetails; };

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "journalNumber",
            "baseName": "journalNumber",
            "type": "number"
        },
        {
            "name": "journalDate",
            "baseName": "journalDate",
            "type": "string"
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string"
        },
        {
            "name": "account",
            "baseName": "account",
            "type": "TransactionAccount"
        },
        {
            "name": "netAmount",
            "baseName": "netAmount",
            "type": "LedgerDecimal"
        },
        {
            "name": "signedNetAmount",
            "baseName": "signedNetAmount",
            "type": "number"
        },
        {
            "name": "taxAmount",
            "baseName": "taxAmount",
            "type": "LedgerDecimal"
        },
        {
            "name": "signedTaxAmount",
            "baseName": "signedTaxAmount",
            "type": "number"
        },
        {
            "name": "source",
            "baseName": "source",
            "type": "LineSource"
        },
        {
            "name": "taxRate",
            "baseName": "taxRate",
            "type": "LineTaxRate"
        },
        {
            "name": "trackingCategories",
            "baseName": "trackingCategories",
            "type": "{ [key: string]: TrackingItemDetails; }"
        }    ];

    static getAttributeTypeMap() {
        return AccountTransactionLine.attributeTypeMap;
    }
}

