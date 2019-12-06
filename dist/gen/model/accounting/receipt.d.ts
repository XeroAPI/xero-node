import { Attachment } from './attachment';
import { Contact } from './contact';
import { LineAmountTypes } from './lineAmountTypes';
import { LineItem } from './lineItem';
import { User } from './user';
import { ValidationError } from './validationError';
export declare class Receipt {
    'date': string;
    'contact': Contact;
    'lineItems': Array<LineItem>;
    'user': User;
    'reference'?: string;
    'lineAmountTypes'?: LineAmountTypes;
    'subTotal'?: number;
    'totalTax'?: number;
    'total'?: number;
    'receiptID'?: string;
    'status'?: Receipt.StatusEnum;
    'receiptNumber'?: string;
    'updatedDateUTC'?: Date;
    'hasAttachments'?: boolean;
    'url'?: string;
    'validationErrors'?: Array<ValidationError>;
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
export declare namespace Receipt {
    enum StatusEnum {
        DRAFT,
        SUBMITTED,
        AUTHORISED,
        DECLINED
    }
}
