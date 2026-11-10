
export class AccountingDateRange {
    'startDate': string;
    'endDate': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        },
        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return AccountingDateRange.attributeTypeMap;
    }
}

