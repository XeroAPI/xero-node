
export class ManualJournalTotal {
    /**
    * Total value of manual journals.
    */
    'total'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "total",
            "baseName": "total",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return ManualJournalTotal.attributeTypeMap;
    }
}

