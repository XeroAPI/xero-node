import { Folder } from '././folder';

export class Folders {
    'folders'?: Array<Folder>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "folders",
            "baseName": "Folders",
            "type": "Array<Folder>"
        }    ];

    static getAttributeTypeMap() {
        return Folders.attributeTypeMap;
    }
}

