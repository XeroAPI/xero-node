import { CreditNote } from '././creditNote';
import { Pagination } from '././pagination';
import { ValidationError } from '././validationError';

export class CreditNotes {
    'pagination'?: Pagination;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    'creditNotes'?: Array<CreditNote>;

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
            "name": "creditNotes",
            "baseName": "CreditNotes",
            "type": "Array<CreditNote>"
        }    ];

    static getAttributeTypeMap() {
        return CreditNotes.attributeTypeMap;
    }
}

