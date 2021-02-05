import { BatchPayment } from '././batchPayment';

export class BatchPayments {
    'batchPayments'?: Array<BatchPayment>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "batchPayments",
            "baseName": "BatchPayments",
            "type": "Array<BatchPayment>"
        }    ];

    static getAttributeTypeMap() {
        return BatchPayments.attributeTypeMap;
    }
}

