
export class ReportAttribute {
    'id'?: string;
    'value'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "Id",
            "type": "string"
        },
        {
            "name": "value",
            "baseName": "Value",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ReportAttribute.attributeTypeMap;
    }
}

