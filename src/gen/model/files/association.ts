import { ObjectGroup } from '././objectGroup';
import { ObjectType } from '././objectType';

export class Association {
    /**
    * Boolean flag to determines whether the file is sent with the document it is attached to on client facing communications. Note- The SendWithObject element is only returned when using /Associations/{ObjectId} endpoint.
    */
    'sendWithObject'?: boolean;
    /**
    * The name of the associated file. Note- The Name element is only returned when using /Associations/{ObjectId} endpoint.
    */
    'name'?: string;
    /**
    * The size of the associated file in bytes. Note- The Size element is only returned when using /Associations/{ObjectId} endpoint.
    */
    'size'?: number;
    /**
    * The unique identifier of the file
    */
    'fileId'?: string;
    /**
    * The identifier of the object that the file is being associated with (e.g. InvoiceID, BankTransactionID, ContactID)
    */
    'objectId'?: string;
    'objectGroup'?: ObjectGroup;
    'objectType'?: ObjectType;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "sendWithObject",
            "baseName": "SendWithObject",
            "type": "boolean"
        },
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        },
        {
            "name": "size",
            "baseName": "Size",
            "type": "number"
        },
        {
            "name": "fileId",
            "baseName": "FileId",
            "type": "string"
        },
        {
            "name": "objectId",
            "baseName": "ObjectId",
            "type": "string"
        },
        {
            "name": "objectGroup",
            "baseName": "ObjectGroup",
            "type": "ObjectGroup"
        },
        {
            "name": "objectType",
            "baseName": "ObjectType",
            "type": "ObjectType"
        }    ];

    static getAttributeTypeMap() {
        return Association.attributeTypeMap;
    }
}

