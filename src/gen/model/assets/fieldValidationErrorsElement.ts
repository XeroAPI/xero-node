
export class FieldValidationErrorsElement {
    /**
    * The field name of the erroneous field
    */
    'fieldName'?: string;
    /**
    * The provided value
    */
    'valueProvided'?: string;
    /**
    * Explanation of the field validation error
    */
    'localisedMessage'?: string;
    /**
    * Internal type of the field validation error message
    */
    'type'?: string;
    /**
    * Title of the field validation error
    */
    'title'?: string;
    /**
    * Detail of the field validation error
    */
    'detail'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "fieldName",
            "baseName": "fieldName",
            "type": "string"
        }        {
            "name": "valueProvided",
            "baseName": "valueProvided",
            "type": "string"
        }        {
            "name": "localisedMessage",
            "baseName": "localisedMessage",
            "type": "string"
        }        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        }        {
            "name": "title",
            "baseName": "title",
            "type": "string"
        }        {
            "name": "detail",
            "baseName": "detail",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return FieldValidationErrorsElement.attributeTypeMap;
    }
}

