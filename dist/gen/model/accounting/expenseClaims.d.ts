import { ExpenseClaim } from './expenseClaim';
export declare class ExpenseClaims {
    'expenseClaims'?: Array<ExpenseClaim>;
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
