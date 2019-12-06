import { ReportAttribute } from './reportAttribute';
export declare class ReportCell {
    'value'?: string;
    'attributes'?: Array<ReportAttribute>;
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
