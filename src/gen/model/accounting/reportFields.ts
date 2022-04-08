
export class ReportFields {
    'fieldID'?: string;
    'description'?: string;
    'value'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "fieldID",
            "baseName": "FieldID",
            "type": "string"
        }        {
            "name": "description",
            "baseName": "Description",
            "type": "string"
        }        {
            "name": "value",
            "baseName": "Value",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ReportFields.attributeTypeMap;
    }
}

