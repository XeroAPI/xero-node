import { Overpayment } from './overpayment';
export declare class Overpayments {
    'overpayments'?: Array<Overpayment>;
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
