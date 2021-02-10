
export class ImportSummaryOrganisation {
    'present'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "present",
            "baseName": "Present",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return ImportSummaryOrganisation.attributeTypeMap;
    }
}

