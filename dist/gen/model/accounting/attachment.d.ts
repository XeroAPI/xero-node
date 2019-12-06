export declare class Attachment {
    'attachmentID'?: string;
    'fileName'?: string;
    'url'?: string;
    'mimeType'?: string;
    'contentLength'?: number;
    'includeOnline'?: boolean;
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
