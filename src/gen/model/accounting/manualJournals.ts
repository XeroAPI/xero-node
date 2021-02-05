import { ManualJournal } from '././manualJournal';

export class ManualJournals {
    'manualJournals'?: Array<ManualJournal>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "manualJournals",
            "baseName": "ManualJournals",
            "type": "Array<ManualJournal>"
        }    ];

    static getAttributeTypeMap() {
        return ManualJournals.attributeTypeMap;
    }
}

