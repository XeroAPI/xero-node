import { ProblemType } from '././problemType';

export class Problem {
    'type'?: ProblemType;
    'title'?: string;
    'status'?: number;
    'detail'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "type",
            "type": "ProblemType"
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
        }    ];

    static getAttributeTypeMap() {
        return Problem.attributeTypeMap;
    }
}

