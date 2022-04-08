
export class InvalidField {
    /**
    * The name of the field that caused the error
    */
    'name'?: string;
    /**
    * The reason the error occurred
    */
    'reason'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        }        {
            "name": "reason",
            "baseName": "reason",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return InvalidField.attributeTypeMap;
    }
}

