
export class InlineObject {
    'body'?: string;
    /**
    * exact name of the file you are uploading
    */
    'name'?: string;
    'filename'?: string;
    'mimeType'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "body",
            "baseName": "body",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "filename",
            "baseName": "filename",
            "type": "string"
        },
        {
            "name": "mimeType",
            "baseName": "mimeType",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return InlineObject.attributeTypeMap;
    }
}

