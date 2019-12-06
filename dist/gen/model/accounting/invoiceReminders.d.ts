import { InvoiceReminder } from './invoiceReminder';
export declare class InvoiceReminders {
    'invoiceReminders'?: Array<InvoiceReminder>;
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
