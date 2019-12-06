import { Attachment } from './attachment';
import { Contact } from './contact';
import { CurrencyCode } from './currencyCode';
import { LineAmountTypes } from './lineAmountTypes';
import { LineItem } from './lineItem';
import { ValidationError } from './validationError';
export declare class PurchaseOrder {
    'contact': Contact;
    'lineItems': Array<LineItem>;
    'date'?: string;
    'deliveryDate'?: string;
    'lineAmountTypes'?: LineAmountTypes;
    'purchaseOrderNumber'?: string;
    'reference'?: string;
    'brandingThemeID'?: string;
    'currencyCode'?: CurrencyCode;
    'status'?: PurchaseOrder.StatusEnum;
    'sentToContact'?: boolean;
    'deliveryAddress'?: string;
    'attentionTo'?: string;
    'telephone'?: string;
    'deliveryInstructions'?: string;
    'expectedArrivalDate'?: string;
    'purchaseOrderID'?: string;
    'currencyRate'?: number;
    'subTotal'?: number;
    'totalTax'?: number;
    'total'?: number;
    'totalDiscount'?: number;
    'hasAttachments'?: boolean;
    'updatedDateUTC'?: Date;
    'statusAttributeString'?: string;
    'validationErrors'?: Array<ValidationError>;
    'warnings'?: Array<ValidationError>;
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
export declare namespace PurchaseOrder {
    enum StatusEnum {
        DRAFT,
        SUBMITTED,
        AUTHORISED,
        BILLED,
        DELETED
    }
}
