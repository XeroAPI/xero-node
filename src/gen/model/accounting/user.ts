
export class User {
    /**
    * Xero identifier
    */
    'userID'?: string;
    /**
    * Email address of user
    */
    'emailAddress'?: string;
    /**
    * First name of user
    */
    'firstName'?: string;
    /**
    * Last name of user
    */
    'lastName'?: string;
    /**
    * Timestamp of last change to user
    */
    'updatedDateUTC'?: Date;
    /**
    * Boolean to indicate if user is the subscriber
    */
    'isSubscriber'?: boolean;
    /**
    * User role that defines permissions in Xero and via API (READONLY, INVOICEONLY, STANDARD, FINANCIALADVISER, etc)
    */
    'organisationRole'?: User.OrganisationRoleEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "userID",
            "baseName": "UserID",
            "type": "string"
        }        {
            "name": "emailAddress",
            "baseName": "EmailAddress",
            "type": "string"
        }        {
            "name": "firstName",
            "baseName": "FirstName",
            "type": "string"
        }        {
            "name": "lastName",
            "baseName": "LastName",
            "type": "string"
        }        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        }        {
            "name": "isSubscriber",
            "baseName": "IsSubscriber",
            "type": "boolean"
        }        {
            "name": "organisationRole",
            "baseName": "OrganisationRole",
            "type": "User.OrganisationRoleEnum"
        }    ];

    static getAttributeTypeMap() {
        return User.attributeTypeMap;
    }
}

export namespace User {
    export enum OrganisationRoleEnum {
        Readonly = <any> 'READONLY',
        Invoiceonly = <any> 'INVOICEONLY',
        Standard = <any> 'STANDARD',
        Financialadviser = <any> 'FINANCIALADVISER',
        Managedclient = <any> 'MANAGEDCLIENT',
        Cashbookclient = <any> 'CASHBOOKCLIENT',
        Unknown = <any> 'UNKNOWN'
    }
}
