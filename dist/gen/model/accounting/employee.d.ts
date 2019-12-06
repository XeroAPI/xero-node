import { ExternalLink } from './externalLink';
export declare class Employee {
    'employeeID'?: string;
    'status'?: Employee.StatusEnum;
    'firstName'?: string;
    'lastName'?: string;
    'externalLink'?: ExternalLink;
    'updatedDateUTC'?: Date;
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
export declare namespace Employee {
    enum StatusEnum {
        ACTIVE,
        ARCHIVED,
        GDPRREQUEST
    }
}
