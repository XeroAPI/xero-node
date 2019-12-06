import { BatchPayment } from './batchPayment';
export declare class BatchPayments {
    'batchPayments'?: Array<BatchPayment>;
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
