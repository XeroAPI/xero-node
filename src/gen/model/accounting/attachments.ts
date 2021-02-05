import { Attachment } from '././attachment';

export class Attachments {
    'attachments'?: Array<Attachment>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "attachments",
            "baseName": "Attachments",
            "type": "Array<Attachment>"
        }    ];

    static getAttributeTypeMap() {
        return Attachments.attributeTypeMap;
    }
}

