import { Contact } from '././contact';
import { Pagination } from '././pagination';
import { ValidationError } from '././validationError';

export class Contacts {
    'pagination'?: Pagination;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    'contacts'?: Array<Contact>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "warnings",
            "baseName": "Warnings",
            "type": "Array<ValidationError>"
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

