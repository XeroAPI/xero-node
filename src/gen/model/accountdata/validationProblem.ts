import { FieldProblem } from '././fieldProblem';

/**
* Returned with `400 Bad Request` when the request fails validation.
*/
export class ValidationProblem {
    /**
    * URI reference identifying the problem type.
    */
    'type'?: string;
    /**
    * Short, human-readable summary.
    */
    'title'?: string;
    /**
    * HTTP status code.
    */
    'status'?: number;
    /**
    * Detailed explanation of the problem.
    */
    'detail'?: string;
    /**
    * URI reference identifying the specific occurrence.
    */
    'instance'?: string;
    'fieldValidationErrors'?: Array<FieldProblem>;

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
        },
        {
            "name": "fieldValidationErrors",
            "baseName": "fieldValidationErrors",
            "type": "Array<FieldProblem>"
        }    ];

    static getAttributeTypeMap() {
        return ValidationProblem.attributeTypeMap;
    }
}

