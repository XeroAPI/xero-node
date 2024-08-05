import { ManualJournal } from '././manualJournal';
import { Pagination } from '././pagination';
import { ValidationError } from '././validationError';

export class ManualJournals {
    'pagination'?: Pagination;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    'manualJournals'?: Array<ManualJournal>;

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
            "name": "manualJournals",
            "baseName": "ManualJournals",
            "type": "Array<ManualJournal>"
        }    ];

    static getAttributeTypeMap() {
        return ManualJournals.attributeTypeMap;
    }
}

