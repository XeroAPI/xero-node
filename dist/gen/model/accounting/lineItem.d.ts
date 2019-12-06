import { LineItemTracking } from './lineItemTracking';
export declare class LineItem {
    'lineItemID'?: string;
    'description'?: string;
    'quantity'?: number;
    'unitAmount'?: number;
    'itemCode'?: string;
    'accountCode'?: string;
    'taxType'?: string;
    'taxAmount'?: number;
    'lineAmount'?: number;
    'tracking'?: Array<LineItemTracking>;
    'discountRate'?: string;
    'discountAmount'?: number;
    'repeatingInvoiceID'?: string;
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
