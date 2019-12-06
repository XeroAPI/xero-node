import { AccountsPayable } from './accountsPayable';
import { AccountsReceivable } from './accountsReceivable';
export declare class Balances {
    'accountsReceivable'?: AccountsReceivable;
    'accountsPayable'?: AccountsPayable;
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
