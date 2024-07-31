import { Invoice } from '././invoice';
import { Pagination } from '././pagination';
import { ValidationError } from '././validationError';

export class Invoices {
    'pagination'?: Pagination;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    'invoices'?: Array<Invoice>;

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
            "name": "invoices",
            "baseName": "Invoices",
            "type": "Array<Invoice>"
        }    ];

    static getAttributeTypeMap() {
        return Invoices.attributeTypeMap;
    }
}

