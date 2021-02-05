import { InvoiceReminder } from '././invoiceReminder';

export class InvoiceReminders {
    'invoiceReminders'?: Array<InvoiceReminder>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "invoiceReminders",
            "baseName": "InvoiceReminders",
            "type": "Array<InvoiceReminder>"
        }    ];

    static getAttributeTypeMap() {
        return InvoiceReminders.attributeTypeMap;
    }
}

