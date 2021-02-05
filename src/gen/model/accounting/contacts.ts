import { Contact } from '././contact';

export class Contacts {
    'contacts'?: Array<Contact>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "contacts",
            "baseName": "Contacts",
            "type": "Array<Contact>"
        }    ];

    static getAttributeTypeMap() {
        return Contacts.attributeTypeMap;
    }
}

