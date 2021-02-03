
export class ModelError {
    /**
    * Exception message
    */
    'message'?: string;
    /**
    * Array of Elements of validation Errors
    */
    'modelState'?: object;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "message",
            "baseName": "message",
            "type": "string"
        },
        {
            "name": "modelState",
            "baseName": "modelState",
            "type": "object"
        }    ];

    static getAttributeTypeMap() {
        return ModelError.attributeTypeMap;
    }
}

