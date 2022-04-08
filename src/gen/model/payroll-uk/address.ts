
export class Address {
    /**
    * Address line 1 for employee home address
    */
    'addressLine1': string;
    /**
    * Address line 2 for employee home address
    */
    'addressLine2'?: string;
    /**
    * Suburb for employee home address
    */
    'city': string;
    /**
    * PostCode for employee home address
    */
    'postCode': string;
    /**
    * Country of HomeAddress
    */
    'countryName'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "addressLine1",
            "baseName": "addressLine1",
            "type": "string"
        },
        {
            "name": "addressLine2",
            "baseName": "addressLine2",
            "type": "string"
        },
        {
            "name": "city",
            "baseName": "city",
            "type": "string"
        },
        {
            "name": "postCode",
            "baseName": "postCode",
            "type": "string"
        },
        {
            "name": "countryName",
            "baseName": "countryName",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Address.attributeTypeMap;
    }
}

