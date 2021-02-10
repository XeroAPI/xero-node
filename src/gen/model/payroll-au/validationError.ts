
export class ValidationError {
    /**
    * Validation error message
    */
    'message'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "message",
            "baseName": "Message",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ValidationError.attributeTypeMap;
    }
}

