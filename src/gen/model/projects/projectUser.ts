
export class ProjectUser {
    /**
    * Identifier of the user of the project.
    */
    'userId'?: string;
    /**
    * Full name of the user.
    */
    'name'?: string;
    /**
    * Email address of the user.
    */
    'email'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "userId",
            "baseName": "userId",
            "type": "string"
        }        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        }        {
            "name": "email",
            "baseName": "email",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ProjectUser.attributeTypeMap;
    }
}

