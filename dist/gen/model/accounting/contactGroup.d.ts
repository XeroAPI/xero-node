import { Contact } from './contact';
export declare class ContactGroup {
    'name'?: string;
    'status'?: ContactGroup.StatusEnum;
    'contactGroupID'?: string;
    'contacts'?: Array<Contact>;
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
export declare namespace ContactGroup {
    enum StatusEnum {
        ACTIVE,
        DELETED
    }
}
