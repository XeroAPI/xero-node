import { Prepayment } from './prepayment';
export declare class Prepayments {
    'prepayments'?: Array<Prepayment>;
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
