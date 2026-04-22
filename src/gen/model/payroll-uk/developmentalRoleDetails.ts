
export class DevelopmentalRoleDetails {
    /**
    * The start date of the developmental role
    */
    'startDate': string;
    /**
    * The end date of the developmental role
    */
    'endDate': string;
    /**
    * The developmental role type - \"Apprentice\" is the only supported role currently
    */
    'developmentalRole': string;
    /**
    * The public key of the developmental role. Public key is required if the intention is to edit an existing developmental role. If no key is supplied a new developmental role will be created
    */
    'publicKey'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        },
        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "string"
        },
        {
            "name": "developmentalRole",
            "baseName": "developmentalRole",
            "type": "string"
        },
        {
            "name": "publicKey",
            "baseName": "publicKey",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return DevelopmentalRoleDetails.attributeTypeMap;
    }
}

