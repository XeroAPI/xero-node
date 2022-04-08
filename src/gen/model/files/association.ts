import { ObjectGroup } from '././objectGroup';
import { ObjectType } from '././objectType';

export class Association {
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
            "name": "fileId",
            "baseName": "FileId",
            "type": "string"
        }        {
            "name": "objectId",
            "baseName": "ObjectId",
            "type": "string"
        }        {
            "name": "objectGroup",
            "baseName": "ObjectGroup",
            "type": "ObjectGroup"
        }        {
            "name": "objectType",
            "baseName": "ObjectType",
            "type": "ObjectType"
        }    ];

    static getAttributeTypeMap() {
        return Association.attributeTypeMap;
    }
}

