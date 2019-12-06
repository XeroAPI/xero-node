import { Allocation } from './allocation';
import { Attachment } from './attachment';
import { Contact } from './contact';
import { CurrencyCode } from './currencyCode';
import { LineAmountTypes } from './lineAmountTypes';
import { LineItem } from './lineItem';
import { Payment } from './payment';
export declare class Overpayment {
    'type'?: Overpayment.TypeEnum;
    'contact'?: Contact;
    'date'?: string;
    'status'?: Overpayment.StatusEnum;
    'lineAmountTypes'?: LineAmountTypes;
    'lineItems'?: Array<LineItem>;
    'subTotal'?: number;
    'totalTax'?: number;
    'total'?: number;
    'updatedDateUTC'?: Date;
    'currencyCode'?: CurrencyCode;
    'overpaymentID'?: string;
    'currencyRate'?: number;
    'remainingCredit'?: number;
    'allocations'?: Array<Allocation>;
    'payments'?: Array<Payment>;
    'hasAttachments'?: boolean;
    'attachments'?: Array<Attachment>;
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
export declare namespace Overpayment {
    enum TypeEnum {
        RECEIVEOVERPAYMENT,
        SPENDOVERPAYMENT,
        AROVERPAYMENT
    }
    enum StatusEnum {
        AUTHORISED,
        PAID,
        VOIDED
    }
}
