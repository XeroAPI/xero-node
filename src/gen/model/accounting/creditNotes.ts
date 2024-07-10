import { CreditNote } from '././creditNote';
import { Pagination } from '././pagination';

export class CreditNotes {
    'pagination'?: Pagination;
    'creditNotes'?: Array<CreditNote>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
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

