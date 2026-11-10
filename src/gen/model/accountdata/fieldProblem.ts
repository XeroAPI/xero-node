
/**
* A single validation failure.
*/
export class FieldProblem {
    /**
    * The name of the offending parameter, or an empty string when the failure is not tied to one parameter.
    */
    'fieldName'?: string;
    'type'?: string;
    'title'?: string;
    'status'?: number;
    'detail'?: string;
    'instance'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "fieldName",
            "baseName": "fieldName",
            "type": "string"
        },
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
        return FieldProblem.attributeTypeMap;
    }
}

