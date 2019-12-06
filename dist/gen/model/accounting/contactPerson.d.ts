export declare class ContactPerson {
    'firstName'?: string;
    'lastName'?: string;
    'emailAddress'?: string;
    'includeInEmails'?: boolean;
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
