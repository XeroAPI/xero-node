import { PaymentTermType } from '././paymentTermType';

export class Bill {
    /**
    * Day of Month (0-31)
    */
    'day'?: number;
    'type'?: PaymentTermType;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "day",
            "baseName": "Day",
            "type": "number"
        },
        {
            "name": "type",
            "baseName": "Type",
            "type": "PaymentTermType"
        }    ];

    static getAttributeTypeMap() {
        return Bill.attributeTypeMap;
    }
}

