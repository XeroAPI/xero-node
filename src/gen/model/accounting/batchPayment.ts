import { Account } from '././account';
import { Payment } from '././payment';
import { ValidationError } from '././validationError';

export class BatchPayment {
    'account'?: Account;
    /**
    * (NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.
    */
    'reference'?: string;
    /**
    * (NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.
    */
    'particulars'?: string;
    /**
    * (NZ Only) Optional references for the batch payment transaction. It will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement you import into Xero.
    */
    'code'?: string;
    /**
    * (Non-NZ Only) These details are sent to the org’s bank as a reference for the batch payment transaction. They will also show with the batch payment transaction in the bank reconciliation Find & Match screen. Depending on your individual bank, the detail may also show on the bank statement imported into Xero. Maximum field length = 18
    */
    'details'?: string;
    /**
    * (UK Only) Only shows on the statement line in Xero. Max length =18
    */
    'narrative'?: string;
    /**
    * The Xero generated unique identifier for the bank transaction (read-only)
    */
    'batchPaymentID'?: string;
    /**
    * Date the payment is being made (YYYY-MM-DD) e.g. 2009-09-06
    */
    'dateString'?: string;
    /**
    * Date the payment is being made (YYYY-MM-DD) e.g. 2009-09-06
    */
    'date'?: string;
    /**
    * The amount of the payment. Must be less than or equal to the outstanding amount owing on the invoice e.g. 200.00
    */
    'amount'?: number;
    /**
    * An array of payments
    */
    'payments'?: Array<Payment>;
    /**
    * PAYBATCH for bill payments or RECBATCH for sales invoice payments (read-only)
    */
    'type'?: BatchPayment.TypeEnum;
    /**
    * AUTHORISED or DELETED (read-only). New batch payments will have a status of AUTHORISED. It is not possible to delete batch payments via the API.
    */
    'status'?: BatchPayment.StatusEnum;
    /**
    * The total of the payments that make up the batch (read-only)
    */
    'totalAmount'?: number;
    /**
    * UTC timestamp of last update to the payment
    */
    'updatedDateUTC'?: Date;
    /**
    * Booelan that tells you if the batch payment has been reconciled (read-only)
    */
    'isReconciled'?: boolean;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "account",
            "baseName": "Account",
            "type": "Account"
        },
        {
            "name": "reference",
            "baseName": "Reference",
            "type": "string"
        },
        {
            "name": "particulars",
            "baseName": "Particulars",
            "type": "string"
        },
        {
            "name": "code",
            "baseName": "Code",
            "type": "string"
        },
        {
            "name": "details",
            "baseName": "Details",
            "type": "string"
        },
        {
            "name": "narrative",
            "baseName": "Narrative",
            "type": "string"
        },
        {
            "name": "batchPaymentID",
            "baseName": "BatchPaymentID",
            "type": "string"
        },
        {
            "name": "dateString",
            "baseName": "DateString",
            "type": "string"
        },
        {
            "name": "date",
            "baseName": "Date",
            "type": "string"
        },
        {
            "name": "amount",
            "baseName": "Amount",
            "type": "number"
        },
        {
            "name": "payments",
            "baseName": "Payments",
            "type": "Array<Payment>"
        },
        {
            "name": "type",
            "baseName": "Type",
            "type": "BatchPayment.TypeEnum"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "BatchPayment.StatusEnum"
        },
        {
            "name": "totalAmount",
            "baseName": "TotalAmount",
            "type": "number"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "isReconciled",
            "baseName": "IsReconciled",
            "type": "boolean"
        },
        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        }    ];

    static getAttributeTypeMap() {
        return BatchPayment.attributeTypeMap;
    }
}

export namespace BatchPayment {
    export enum TypeEnum {
        PAYBATCH = <any> 'PAYBATCH',
        RECBATCH = <any> 'RECBATCH'
    }
    export enum StatusEnum {
        AUTHORISED = <any> 'AUTHORISED',
        DELETED = <any> 'DELETED'
    }
}
