
export class User {
    /**
    * Xero identifier
    */
    'id': string;
    /**
    * Key is Name, but returns Email address of user who created the file
    */
    'name'?: string;
    /**
    * First name of user
    */
    'firstName'?: string;
    /**
    * Last name of user
    */
    'lastName'?: string;
    /**
    * Last name of user
    */
    'fullName'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "Id",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        },
        {
            "name": "firstName",
            "baseName": "FirstName",
            "type": "string"
        },
        {
            "name": "lastName",
            "baseName": "LastName",
            "type": "string"
        },
        {
            "name": "fullName",
            "baseName": "FullName",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return User.attributeTypeMap;
    }
}

