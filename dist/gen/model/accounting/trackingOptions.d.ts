import { TrackingOption } from './trackingOption';
export declare class TrackingOptions {
    'options'?: Array<TrackingOption>;
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
