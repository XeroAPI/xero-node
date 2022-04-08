import { Account } from '././account';
import { Contact } from '././contact';
import { CurrencyCode } from '././currencyCode';
import { LineAmountTypes } from '././lineAmountTypes';
import { LineItem } from '././lineItem';
import { ValidationError } from '././validationError';

export class BankTransaction {
    /**
    * See Bank Transaction Types
    */
    'type': BankTransaction.TypeEnum;
    'contact'?: Contact;
    /**
    * See LineItems
    */
    'lineItems': Array<LineItem>;
    'bankAccount': Account;
    /**
    * Boolean to show if transaction is reconciled
    */
    'isReconciled'?: boolean;
    /**
    * Date of transaction – YYYY-MM-DD
    */
    'date'?: string;
    /**
    * Reference for the transaction. Only supported for SPEND and RECEIVE transactions.
    */
    'reference'?: string;
    'currencyCode'?: CurrencyCode;
    /**
    * Exchange rate to base currency when money is spent or received. e.g.0.7500 Only used for bank transactions in non base currency. If this isn’t specified for non base currency accounts then either the user-defined rate (preference) or the XE.com day rate will be used. Setting currency is only supported on overpayments.
    */
    'currencyRate'?: number;
    /**
    * URL link to a source document – shown as “Go to App Name”
    */
    'url'?: string;
    /**
    * See Bank Transaction Status Codes
    */
    'status'?: BankTransaction.StatusEnum;
    'lineAmountTypes'?: LineAmountTypes;
    /**
    * Total of bank transaction excluding taxes
    */
    'subTotal'?: number;
    /**
    * Total tax on bank transaction
    */
    'totalTax'?: number;
    /**
    * Total of bank transaction tax inclusive
    */
    'total'?: number;
    /**
    * Xero generated unique identifier for bank transaction
    */
    'bankTransactionID'?: string;
    /**
    * Xero generated unique identifier for a Prepayment. This will be returned on BankTransactions with a Type of SPEND-PREPAYMENT or RECEIVE-PREPAYMENT
    */
    'prepaymentID'?: string;
    /**
    * Xero generated unique identifier for an Overpayment. This will be returned on BankTransactions with a Type of SPEND-OVERPAYMENT or RECEIVE-OVERPAYMENT
    */
    'overpaymentID'?: string;
    /**
    * Last modified date UTC format
    */
    'updatedDateUTC'?: Date;
    /**
    * Boolean to indicate if a bank transaction has an attachment
    */
    'hasAttachments'?: boolean;
    /**
    * A string to indicate if a invoice status
    */
    'statusAttributeString'?: string;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "Type",
            "type": "BankTransaction.TypeEnum"
        }        {
            "name": "contact",
            "baseName": "Contact",
            "type": "Contact"
        }        {
            "name": "lineItems",
            "baseName": "LineItems",
            "type": "Array<LineItem>"
        }        {
            "name": "bankAccount",
            "baseName": "BankAccount",
            "type": "Account"
        }        {
            "name": "isReconciled",
            "baseName": "IsReconciled",
            "type": "boolean"
        }        {
            "name": "date",
            "baseName": "Date",
            "type": "string"
        }        {
            "name": "reference",
            "baseName": "Reference",
            "type": "string"
        }        {
            "name": "currencyCode",
            "baseName": "CurrencyCode",
            "type": "CurrencyCode"
        }        {
            "name": "currencyRate",
            "baseName": "CurrencyRate",
            "type": "number"
        }        {
            "name": "url",
            "baseName": "Url",
            "type": "string"
        }        {
            "name": "status",
            "baseName": "Status",
            "type": "BankTransaction.StatusEnum"
        }        {
            "name": "lineAmountTypes",
            "baseName": "LineAmountTypes",
            "type": "LineAmountTypes"
        }        {
            "name": "subTotal",
            "baseName": "SubTotal",
            "type": "number"
        }        {
            "name": "totalTax",
            "baseName": "TotalTax",
            "type": "number"
        }        {
            "name": "total",
            "baseName": "Total",
            "type": "number"
        }        {
            "name": "bankTransactionID",
            "baseName": "BankTransactionID",
            "type": "string"
        }        {
            "name": "prepaymentID",
            "baseName": "PrepaymentID",
            "type": "string"
        }        {
            "name": "overpaymentID",
            "baseName": "OverpaymentID",
            "type": "string"
        }        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        }        {
            "name": "hasAttachments",
            "baseName": "HasAttachments",
            "type": "boolean"
        }        {
            "name": "statusAttributeString",
            "baseName": "StatusAttributeString",
            "type": "string"
        }        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        }    ];

    static getAttributeTypeMap() {
        return BankTransaction.attributeTypeMap;
    }
}

export namespace BankTransaction {
    export enum TypeEnum {
        Receive = <any> 'RECEIVE',
        ReceiveOverpayment = <any> 'RECEIVE-OVERPAYMENT',
        ReceivePrepayment = <any> 'RECEIVE-PREPAYMENT',
        Spend = <any> 'SPEND',
        SpendOverpayment = <any> 'SPEND-OVERPAYMENT',
        SpendPrepayment = <any> 'SPEND-PREPAYMENT',
        ReceiveTransfer = <any> 'RECEIVE-TRANSFER',
        SpendTransfer = <any> 'SPEND-TRANSFER'
    }
    export enum StatusEnum {
        Authorised = <any> 'AUTHORISED',
        Deleted = <any> 'DELETED',
        Voided = <any> 'VOIDED'
    }
}
