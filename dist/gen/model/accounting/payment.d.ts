import { Account } from './account';
import { CreditNote } from './creditNote';
import { Invoice } from './invoice';
import { Overpayment } from './overpayment';
import { Prepayment } from './prepayment';
import { ValidationError } from './validationError';
export declare class Payment {
    'invoice'?: Invoice;
    'creditNote'?: CreditNote;
    'prepayment'?: Prepayment;
    'overpayment'?: Overpayment;
    'invoiceNumber'?: string;
    'creditNoteNumber'?: string;
    'account'?: Account;
    'code'?: string;
    'date'?: string;
    'currencyRate'?: number;
    'amount'?: number;
    'reference'?: string;
    'isReconciled'?: boolean;
    'status'?: Payment.StatusEnum;
    'paymentType'?: Payment.PaymentTypeEnum;
    'updatedDateUTC'?: Date;
    'paymentID'?: string;
    'bankAccountNumber'?: string;
    'particulars'?: string;
    'details'?: string;
    'hasAccount'?: boolean;
    'hasValidationErrors'?: boolean;
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
export declare namespace Payment {
    enum StatusEnum {
        AUTHORISED,
        DELETED
    }
    enum PaymentTypeEnum {
        ACCRECPAYMENT,
        ACCPAYPAYMENT,
        ARCREDITPAYMENT,
        APCREDITPAYMENT,
        AROVERPAYMENTPAYMENT,
        ARPREPAYMENTPAYMENT,
        APPREPAYMENTPAYMENT,
        APOVERPAYMENTPAYMENT
    }
}
