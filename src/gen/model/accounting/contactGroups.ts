import { ContactGroup } from '././contactGroup';

export class ContactGroups {
    'contactGroups'?: Array<ContactGroup>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "contactGroups",
            "baseName": "ContactGroups",
            "type": "Array<ContactGroup>"
        }    ];

    static getAttributeTypeMap() {
        return ContactGroups.attributeTypeMap;
    }
}

