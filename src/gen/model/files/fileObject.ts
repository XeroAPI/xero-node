import { User } from '././user';

export class FileObject {
    /**
    * File Name
    */
    'name'?: string;
    /**
    * MimeType of the file (image/png, image/jpeg, application/pdf, etc..)
    */
    'mimeType'?: string;
    /**
    * Numeric value in bytes
    */
    'size'?: number;
    /**
    * Created date in UTC
    */
    'createdDateUtc'?: string;
    /**
    * Updated date in UTC
    */
    'updatedDateUtc'?: string;
    'user'?: User;
    /**
    * File object\'s UUID
    */
    'id'?: string;
    /**
    * Folder relation object\'s UUID
    */
    'folderId'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        }        {
            "name": "mimeType",
            "baseName": "MimeType",
            "type": "string"
        }        {
            "name": "size",
            "baseName": "Size",
            "type": "number"
        }        {
            "name": "createdDateUtc",
            "baseName": "CreatedDateUtc",
            "type": "string"
        }        {
            "name": "updatedDateUtc",
            "baseName": "UpdatedDateUtc",
            "type": "string"
        }        {
            "name": "user",
            "baseName": "User",
            "type": "User"
        }        {
            "name": "id",
            "baseName": "Id",
            "type": "string"
        }        {
            "name": "folderId",
            "baseName": "FolderId",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return FileObject.attributeTypeMap;
    }
}

