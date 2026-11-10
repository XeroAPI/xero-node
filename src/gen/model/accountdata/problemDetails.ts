
/**
* Problem details for HTTP APIs, in the style of RFC 7807.
*/
export class ProblemDetails {
    /**
    * URI reference identifying the problem type.
    */
    'type'?: string;
    /**
    * Short, human-readable summary.
    */
    'title': string;
    /**
    * HTTP status code.
    */
    'status': number;
    /**
    * Detailed explanation of the problem.
    */
    'detail'?: string;
    /**
    * URI reference identifying the specific occurrence.
    */
    'instance'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        },
        {
            "name": "title",
            "baseName": "title",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "number"
        },
        {
            "name": "detail",
            "baseName": "detail",
            "type": "string"
        },
        {
            "name": "instance",
            "baseName": "instance",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ProblemDetails.attributeTypeMap;
    }
}

