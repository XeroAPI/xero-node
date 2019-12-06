import { Contact } from './contact';
import { CurrencyCode } from './currencyCode';
import { LineAmountTypes } from './lineAmountTypes';
import { LineItem } from './lineItem';
import { QuoteStatusCodes } from './quoteStatusCodes';
export declare class Quote {
    'quoteID'?: string;
    'quoteNumber'?: string;
    'reference'?: string;
    'terms'?: string;
    'contact': Contact;
    'lineItems'?: Array<LineItem>;
    'date'?: string;
    'dateString'?: string;
    'expiryDate'?: string;
    'expiryDateString'?: string;
    'status'?: QuoteStatusCodes;
    'currencyCode'?: CurrencyCode;
    'currencyRate'?: number;
    'subTotal'?: number;
    'totalTax'?: number;
    'total'?: number;
    'totalDiscount'?: number;
    'title'?: string;
    'summary'?: string;
    'brandingThemeID'?: string;
    'updatedDateUTC'?: Date;
    'lineAmountTypes'?: LineAmountTypes;
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
