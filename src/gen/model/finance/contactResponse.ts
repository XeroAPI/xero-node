
export class ContactResponse {
    /**
    * Xero Identifier of contact
    */
    'contactId'?: string;
    /**
    * Full name of contact/organisation
    */
    'contactName'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "contactId",
            "baseName": "contactId",
            "type": "string"
        },
        {
            "name": "contactName",
            "baseName": "contactName",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ContactResponse.attributeTypeMap;
    }
}

