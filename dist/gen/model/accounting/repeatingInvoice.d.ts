import { Attachment } from './attachment';
import { Contact } from './contact';
import { CurrencyCode } from './currencyCode';
import { LineAmountTypes } from './lineAmountTypes';
import { LineItem } from './lineItem';
import { Schedule } from './schedule';
export declare class RepeatingInvoice {
    'type'?: RepeatingInvoice.TypeEnum;
    'contact'?: Contact;
    'schedule'?: Schedule;
    'lineItems'?: Array<LineItem>;
    'lineAmountTypes'?: LineAmountTypes;
    'reference'?: string;
    'brandingThemeID'?: string;
    'currencyCode'?: CurrencyCode;
    'status'?: RepeatingInvoice.StatusEnum;
    'subTotal'?: number;
    'totalTax'?: number;
    'total'?: number;
    'repeatingInvoiceID'?: string;
    'ID'?: string;
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
export declare namespace RepeatingInvoice {
    enum TypeEnum {
        ACCPAY,
        ACCREC
    }
    enum StatusEnum {
        DRAFT,
        AUTHORISED
    }
}
