
/**
* The originating document/event for this transaction line. Always present; its fields are null when the source is unknown.
*/
export class LineSource {
    'documentId'?: string;
    'documentType'?: string;
    'eventType'?: string;
    'contactId'?: string;
    'contactName'?: string;
    'reference'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "documentId",
            "baseName": "documentId",
            "type": "string"
        },
        {
            "name": "documentType",
            "baseName": "documentType",
            "type": "string"
        },
        {
            "name": "eventType",
            "baseName": "eventType",
            "type": "string"
        },
        {
            "name": "contactId",
            "baseName": "contactId",
            "type": "string"
        },
        {
            "name": "contactName",
            "baseName": "contactName",
            "type": "string"
        },
        {
            "name": "reference",
            "baseName": "reference",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return LineSource.attributeTypeMap;
    }
}

