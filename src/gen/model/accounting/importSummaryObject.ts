import { ImportSummary } from '././importSummary';

export class ImportSummaryObject {
    'importSummary'?: ImportSummary;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "importSummary",
            "baseName": "ImportSummary",
            "type": "ImportSummary"
        }    ];

    static getAttributeTypeMap() {
        return ImportSummaryObject.attributeTypeMap;
    }
}

