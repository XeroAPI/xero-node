import { Allocation } from './allocation';
import { Contact } from './contact';
import { CurrencyCode } from './currencyCode';
import { LineAmountTypes } from './lineAmountTypes';
import { LineItem } from './lineItem';
import { Payment } from './payment';
import { ValidationError } from './validationError';
export declare class CreditNote {
    'type'?: CreditNote.TypeEnum;
    'contact'?: Contact;
    'date'?: string;
    'status'?: CreditNote.StatusEnum;
    'lineAmountTypes'?: LineAmountTypes;
    'lineItems'?: Array<LineItem>;
    'subTotal'?: number;
    'totalTax'?: number;
    'total'?: number;
    'updatedDateUTC'?: Date;
    'currencyCode'?: CurrencyCode;
    'fullyPaidOnDate'?: string;
    'creditNoteID'?: string;
    'creditNoteNumber'?: string;
    'reference'?: string;
    'sentToContact'?: boolean;
    'currencyRate'?: number;
    'remainingCredit'?: number;
    'allocations'?: Array<Allocation>;
    'payments'?: Array<Payment>;
    'brandingThemeID'?: string;
    'hasAttachments'?: boolean;
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
export declare namespace CreditNote {
    enum TypeEnum {
        ACCPAYCREDIT,
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
