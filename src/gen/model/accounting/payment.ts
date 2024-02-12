import { Account } from '././account';
import { BatchPayment } from '././batchPayment';
import { CreditNote } from '././creditNote';
import { Invoice } from '././invoice';
import { Overpayment } from '././overpayment';
import { Prepayment } from '././prepayment';
import { ValidationError } from '././validationError';

export class Payment {
    'invoice'?: Invoice;
    'creditNote'?: CreditNote;
    'prepayment'?: Prepayment;
    'overpayment'?: Overpayment;
    /**
    * Number of invoice or credit note you are applying payment to e.g.INV-4003
    */
    'invoiceNumber'?: string;
    /**
    * Number of invoice or credit note you are applying payment to e.g. INV-4003
    */
    'creditNoteNumber'?: string;
    'batchPayment'?: BatchPayment;
    'account'?: Account;
    /**
    * Code of account you are using to make the payment e.g. 001 (note- not all accounts have a code value)
    */
    'code'?: string;
    /**
    * Date the payment is being made (YYYY-MM-DD) e.g. 2009-09-06
    */
    'date'?: string;
    /**
    * Exchange rate when payment is received. Only used for non base currency invoices and credit notes e.g. 0.7500
    */
    'currencyRate'?: number;
    /**
    * The amount of the payment. Must be less than or equal to the outstanding amount owing on the invoice e.g. 200.00
    */
    'amount'?: number;
    /**
    * The amount of the payment in the currency of the bank account.
    */
    'bankAmount'?: number;
    /**
    * An optional description for the payment e.g. Direct Debit
    */
    'reference'?: string;
    /**
    * An optional parameter for the payment. A boolean indicating whether you would like the payment to be created as reconciled when using PUT, or whether a payment has been reconciled when using GET
    */
    'isReconciled'?: boolean;
    /**
    * The status of the payment.
    */
    'status'?: Payment.StatusEnum;
    /**
    * See Payment Types.
    */
    'paymentType'?: Payment.PaymentTypeEnum;
    /**
    * UTC timestamp of last update to the payment
    */
    'updatedDateUTC'?: Date;
    /**
    * The Xero identifier for an Payment e.g. 297c2dc5-cc47-4afd-8ec8-74990b8761e9
    */
    'paymentID'?: string;
    /**
    * Present if the payment was created as part of a batch.
    */
    'batchPaymentID'?: string;
    /**
    * The suppliers bank account number the payment is being made to
    */
    'bankAccountNumber'?: string;
    /**
    * The suppliers bank account number the payment is being made to
    */
    'particulars'?: string;
    /**
    * The information to appear on the supplier\'s bank account
    */
    'details'?: string;
    /**
    * A boolean to indicate if a contact has an validation errors
    */
    'hasAccount'?: boolean;
    /**
    * A boolean to indicate if a contact has an validation errors
    */
    'hasValidationErrors'?: boolean;
    /**
    * A string to indicate if a invoice status
    */
    'statusAttributeString'?: string;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "invoice",
            "baseName": "Invoice",
            "type": "Invoice"
        },
        {
            "name": "creditNote",
            "baseName": "CreditNote",
            "type": "CreditNote"
        },
        {
            "name": "prepayment",
            "baseName": "Prepayment",
            "type": "Prepayment"
        },
        {
            "name": "overpayment",
            "baseName": "Overpayment",
            "type": "Overpayment"
        },
        {
            "name": "invoiceNumber",
            "baseName": "InvoiceNumber",
            "type": "string"
        },
        {
            "name": "creditNoteNumber",
            "baseName": "CreditNoteNumber",
            "type": "string"
        },
        {
            "name": "batchPayment",
            "baseName": "BatchPayment",
            "type": "BatchPayment"
        },
        {
            "name": "account",
            "baseName": "Account",
            "type": "Account"
        },
        {
            "name": "code",
            "baseName": "Code",
            "type": "string"
        },
        {
            "name": "date",
            "baseName": "Date",
            "type": "string"
        },
        {
            "name": "currencyRate",
            "baseName": "CurrencyRate",
            "type": "number"
        },
        {
            "name": "amount",
            "baseName": "Amount",
            "type": "number"
        },
        {
            "name": "bankAmount",
            "baseName": "BankAmount",
            "type": "number"
        },
        {
            "name": "reference",
            "baseName": "Reference",
            "type": "string"
        },
        {
            "name": "isReconciled",
            "baseName": "IsReconciled",
            "type": "boolean"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "Payment.StatusEnum"
        },
        {
            "name": "paymentType",
            "baseName": "PaymentType",
            "type": "Payment.PaymentTypeEnum"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "paymentID",
            "baseName": "PaymentID",
            "type": "string"
        },
        {
            "name": "batchPaymentID",
            "baseName": "BatchPaymentID",
            "type": "string"
        },
        {
            "name": "bankAccountNumber",
            "baseName": "BankAccountNumber",
            "type": "string"
        },
        {
            "name": "particulars",
            "baseName": "Particulars",
            "type": "string"
        },
        {
            "name": "details",
            "baseName": "Details",
            "type": "string"
        },
        {
            "name": "hasAccount",
            "baseName": "HasAccount",
            "type": "boolean"
        },
        {
            "name": "hasValidationErrors",
            "baseName": "HasValidationErrors",
            "type": "boolean"
        },
        {
            "name": "statusAttributeString",
            "baseName": "StatusAttributeString",
            "type": "string"
        },
        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        },
        {
            "name": "warnings",
            "baseName": "Warnings",
            "type": "Array<ValidationError>"
        }    ];

    static getAttributeTypeMap() {
        return Payment.attributeTypeMap;
    }
}

export namespace Payment {
    export enum StatusEnum {
        AUTHORISED = <any> 'AUTHORISED',
        DELETED = <any> 'DELETED'
    }
    export enum PaymentTypeEnum {
        ACCRECPAYMENT = <any> 'ACCRECPAYMENT',
        ACCPAYPAYMENT = <any> 'ACCPAYPAYMENT',
        ARCREDITPAYMENT = <any> 'ARCREDITPAYMENT',
        APCREDITPAYMENT = <any> 'APCREDITPAYMENT',
        AROVERPAYMENTPAYMENT = <any> 'AROVERPAYMENTPAYMENT',
        ARPREPAYMENTPAYMENT = <any> 'ARPREPAYMENTPAYMENT',
        APPREPAYMENTPAYMENT = <any> 'APPREPAYMENTPAYMENT',
        APOVERPAYMENTPAYMENT = <any> 'APOVERPAYMENTPAYMENT'
    }
}
