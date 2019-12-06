import { RepeatingInvoice } from './repeatingInvoice';
export declare class RepeatingInvoices {
    'repeatingInvoices'?: Array<RepeatingInvoice>;
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
