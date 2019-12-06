import { CISSetting } from './cISSetting';
export declare class CISSettings {
    'cISSettings'?: Array<CISSetting>;
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
