import { Account } from './account';
import { Contact } from './contact';
import { CurrencyCode } from './currencyCode';
import { LineAmountTypes } from './lineAmountTypes';
import { LineItem } from './lineItem';
import { ValidationError } from './validationError';
export declare class BankTransaction {
    'type': BankTransaction.TypeEnum;
    'contact': Contact;
    'lineItems': Array<LineItem>;
    'bankAccount': Account;
    'isReconciled'?: boolean;
    'date'?: string;
    'reference'?: string;
    'currencyCode'?: CurrencyCode;
    'currencyRate'?: number;
    'url'?: string;
    'status'?: BankTransaction.StatusEnum;
    'lineAmountTypes'?: LineAmountTypes;
    'subTotal'?: number;
    'totalTax'?: number;
    'total'?: number;
    'bankTransactionID'?: string;
    'prepaymentID'?: string;
    'overpaymentID'?: string;
    'updatedDateUTC'?: Date;
    'hasAttachments'?: boolean;
    'statusAttributeString'?: string;
    'validationErrors'?: Array<ValidationError>;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare namespace BankTransaction {
    enum TypeEnum {
        RECEIVE,
        RECEIVEOVERPAYMENT,
        RECEIVEPREPAYMENT,
        SPEND,
        SPENDOVERPAYMENT,
        SPENDPREPAYMENT,
        RECEIVETRANSFER,
        SPENDTRANSFER
    }
    enum StatusEnum {
        AUTHORISED,
        DELETED,
        VOIDED
    }
}
