import { ManualJournal } from '././manualJournal';
import { Pagination } from '././pagination';

export class ManualJournals {
    'pagination'?: Pagination;
    'manualJournals'?: Array<ManualJournal>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "manualJournals",
            "baseName": "ManualJournals",
            "type": "Array<ManualJournal>"
        }    ];

    static getAttributeTypeMap() {
        return ManualJournals.attributeTypeMap;
    }
}

