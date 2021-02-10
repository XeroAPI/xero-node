
export class RequestEmpty {
    /**
    * Need at least one field to create an empty JSON payload
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
        return RequestEmpty.attributeTypeMap;
    }
}

