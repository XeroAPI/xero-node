import { Item } from '././item';

export class Items {
    'items'?: Array<Item>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "items",
            "baseName": "Items",
            "type": "Array<Item>"
        }    ];

    static getAttributeTypeMap() {
        return Items.attributeTypeMap;
    }
}

