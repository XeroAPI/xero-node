import { CreditDebitIndicator } from '././creditDebitIndicator';

/**
* the lines details for a statement
*/
export class StatementLine {
    /**
    * The date that the transaction was processed or cleared as seen in internet banking ISO-8601 YYYY-MM-DD
    */
    'postedDate'?: string;
    /**
    * Transaction description
    */
    'description'?: string;
    /**
    * Transaction amount
    */
    'amount'?: number;
    'creditDebitIndicator'?: CreditDebitIndicator;
    /**
    * Financial institute\'s internal transaction identifier. If provided this field is factored into duplicate detection.
    */
    'transactionId'?: string;
    /**
    * Typically the merchant or payee name
    */
    'payeeName'?: string;
    /**
    * Optional field to enhance the Description
    */
    'reference'?: string;
    /**
    * The cheque/check number
    */
    'chequeNumber'?: string;
    /**
    * Descriptive transaction type
    */
    'transactionType'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "postedDate",
            "baseName": "postedDate",
            "type": "string"
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string"
        },
        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        },
        {
            "name": "creditDebitIndicator",
            "baseName": "creditDebitIndicator",
            "type": "CreditDebitIndicator"
        },
        {
            "name": "transactionId",
            "baseName": "transactionId",
            "type": "string"
        },
        {
            "name": "payeeName",
            "baseName": "payeeName",
            "type": "string"
        },
        {
            "name": "reference",
            "baseName": "reference",
            "type": "string"
        },
        {
            "name": "chequeNumber",
            "baseName": "chequeNumber",
            "type": "string"
        },
        {
            "name": "transactionType",
            "baseName": "transactionType",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return StatementLine.attributeTypeMap;
    }
}

