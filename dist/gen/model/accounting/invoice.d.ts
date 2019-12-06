import { Attachment } from './attachment';
import { Contact } from './contact';
import { CreditNote } from './creditNote';
import { CurrencyCode } from './currencyCode';
import { LineAmountTypes } from './lineAmountTypes';
import { LineItem } from './lineItem';
import { Overpayment } from './overpayment';
import { Payment } from './payment';
import { Prepayment } from './prepayment';
import { ValidationError } from './validationError';
export declare class Invoice {
    'type': Invoice.TypeEnum;
    'contact': Contact;
    'lineItems': Array<LineItem>;
    'date'?: string;
    'dueDate'?: string;
    'lineAmountTypes'?: LineAmountTypes;
    'invoiceNumber'?: string;
    'reference'?: string;
    'brandingThemeID'?: string;
    'url'?: string;
    'currencyCode'?: CurrencyCode;
    'currencyRate'?: number;
    'status'?: Invoice.StatusEnum;
    'sentToContact'?: boolean;
    'expectedPaymentDate'?: string;
    'plannedPaymentDate'?: string;
    'cISDeduction'?: number;
    'subTotal'?: number;
    'totalTax'?: number;
    'total'?: number;
    'totalDiscount'?: number;
    'invoiceID'?: string;
    'hasAttachments'?: boolean;
    'isDiscounted'?: boolean;
    'payments'?: Array<Payment>;
    'prepayments'?: Array<Prepayment>;
    'overpayments'?: Array<Overpayment>;
    'amountDue'?: number;
    'amountPaid'?: number;
    'fullyPaidOnDate'?: string;
    'amountCredited'?: number;
    'updatedDateUTC'?: Date;
    'creditNotes'?: Array<CreditNote>;
    'attachments'?: Array<Attachment>;
    'hasErrors'?: boolean;
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
export declare namespace Invoice {
    enum TypeEnum {
        ACCPAY,
        ACCPAYCREDIT,
        AROVERPAYMENT,
        ACCREC,
        ACCRECCREDIT
    }
    enum StatusEnum {
        DRAFT,
        SUBMITTED,
        DELETED,
        AUTHORISED,
        PAID,
        VOIDED
    }
}
