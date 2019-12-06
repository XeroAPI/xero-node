export declare class User {
    'userID'?: string;
    'emailAddress'?: string;
    'firstName'?: string;
    'lastName'?: string;
    'updatedDateUTC'?: Date;
    'isSubscriber'?: boolean;
    'organisationRole'?: User.OrganisationRoleEnum;
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
export declare namespace User {
    enum OrganisationRoleEnum {
        READONLY,
        INVOICEONLY,
        STANDARD,
        FINANCIALADVISER,
        MANAGEDCLIENT,
        CASHBOOKCLIENT,
        UNKNOWN
    }
}
