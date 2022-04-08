
export class ProblemDetails {
    'detail'?: string;
    'extensions'?: object;
    'instance'?: string;
    'status'?: number;
    'title'?: string;
    'type'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "detail",
            "baseName": "detail",
            "type": "string"
        },
        {
            "name": "extensions",
            "baseName": "extensions",
            "type": "object"
        },
        {
            "name": "instance",
            "baseName": "instance",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "number"
        },
        {
            "name": "title",
            "baseName": "title",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ProblemDetails.attributeTypeMap;
    }
}

