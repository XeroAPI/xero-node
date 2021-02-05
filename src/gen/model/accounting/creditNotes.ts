import { CreditNote } from '././creditNote';

export class CreditNotes {
    'creditNotes'?: Array<CreditNote>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "creditNotes",
            "baseName": "CreditNotes",
            "type": "Array<CreditNote>"
        }    ];

    static getAttributeTypeMap() {
        return CreditNotes.attributeTypeMap;
    }
}

