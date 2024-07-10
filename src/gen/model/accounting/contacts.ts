import { Contact } from '././contact';
import { Pagination } from '././pagination';

export class Contacts {
    'pagination'?: Pagination;
    'contacts'?: Array<Contact>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "contacts",
            "baseName": "Contacts",
            "type": "Array<Contact>"
        }    ];

    static getAttributeTypeMap() {
        return Contacts.attributeTypeMap;
    }
}

