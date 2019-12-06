import { Allocation } from './allocation';
import { Attachment } from './attachment';
import { Contact } from './contact';
import { CurrencyCode } from './currencyCode';
import { LineAmountTypes } from './lineAmountTypes';
import { LineItem } from './lineItem';
export declare class Prepayment {
    'type'?: Prepayment.TypeEnum;
    'contact'?: Contact;
    'date'?: string;
    'status'?: Prepayment.StatusEnum;
    'lineAmountTypes'?: LineAmountTypes;
    'lineItems'?: Array<LineItem>;
    'subTotal'?: number;
    'totalTax'?: number;
    'total'?: number;
    'updatedDateUTC'?: Date;
    'currencyCode'?: CurrencyCode;
    'prepaymentID'?: string;
    'currencyRate'?: number;
    'remainingCredit'?: number;
    'allocations'?: Array<Allocation>;
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
export declare namespace Prepayment {
    enum TypeEnum {
        RECEIVEPREPAYMENT,
        SPENDPREPAYMENT,
        ARPREPAYMENT,
        APPREPAYMENT
    }
    enum StatusEnum {
        AUTHORISED,
        PAID,
        VOIDED
    }
}
