
export class InvoiceReminder {
    /**
    * setting for on or off
    */
    'enabled'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "enabled",
            "baseName": "Enabled",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return InvoiceReminder.attributeTypeMap;
    }
}

