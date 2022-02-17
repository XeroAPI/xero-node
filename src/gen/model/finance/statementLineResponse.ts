import { BankTransactionResponse } from '././bankTransactionResponse';
import { PaymentResponse } from '././paymentResponse';

export class StatementLineResponse {
    /**
    * Xero Identifier of statement line
    */
    'statementLineId'?: string;
    /**
    * Date of when statement line was posted
    */
    'postedDate'?: Date;
    /**
    * Reference description of statement line
    */
    'reference'?: string;
    /**
    * Notes description of statement line
    */
    'notes'?: string;
    /**
    * Cheque number of statement line
    */
    'chequeNo'?: string;
    /**
    * Amount of statement line
    */
    'amount'?: number;
    /**
    * Transaction date of statement line
    */
    'transactionDate'?: Date;
    /**
    * Type of statement line
    */
    'type'?: string;
    /**
    * Boolean to show if statement line is reconciled
    */
    'isReconciled'?: boolean;
    /**
    * Boolean to show if statement line is duplicate
    */
    'isDuplicate'?: boolean;
    /**
    * Boolean to show if statement line is deleted
    */
    'isDeleted'?: boolean;
    /**
    * List of payments associated with reconciled statement lines
    */
    'payments'?: Array<PaymentResponse>;
    /**
    * List of bank transactions associated with reconciled statement lines
    */
    'bankTransactions'?: Array<BankTransactionResponse>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "statementLineId",
            "baseName": "statementLineId",
            "type": "string"
        },
        {
            "name": "postedDate",
            "baseName": "postedDate",
            "type": "Date"
        },
        {
            "name": "reference",
            "baseName": "reference",
            "type": "string"
        },
        {
            "name": "notes",
            "baseName": "notes",
            "type": "string"
        },
        {
            "name": "chequeNo",
            "baseName": "chequeNo",
            "type": "string"
        },
        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        },
        {
            "name": "transactionDate",
            "baseName": "transactionDate",
            "type": "Date"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        },
        {
            "name": "isReconciled",
            "baseName": "isReconciled",
            "type": "boolean"
        },
        {
            "name": "isDuplicate",
            "baseName": "isDuplicate",
            "type": "boolean"
        },
        {
            "name": "isDeleted",
            "baseName": "isDeleted",
            "type": "boolean"
        },
        {
            "name": "payments",
            "baseName": "payments",
            "type": "Array<PaymentResponse>"
        },
        {
            "name": "bankTransactions",
            "baseName": "bankTransactions",
            "type": "Array<BankTransactionResponse>"
        }    ];

    static getAttributeTypeMap() {
        return StatementLineResponse.attributeTypeMap;
    }
}

