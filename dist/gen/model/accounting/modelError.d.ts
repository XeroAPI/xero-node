import { Element } from './element';
export declare class ModelError {
    'errorNumber'?: number;
    'type'?: string;
    'message'?: string;
    'elements'?: Array<Element>;
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
