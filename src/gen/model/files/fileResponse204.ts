
export class FileResponse204 {
    /**
    * Status response for 204 no content
    */
    'status'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "status",
            "baseName": "Status",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return FileResponse204.attributeTypeMap;
    }
}

