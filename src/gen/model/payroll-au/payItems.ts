import { PayItem } from '././payItem';

export class PayItems {
    'payItems'?: PayItem;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payItems",
            "baseName": "PayItems",
            "type": "PayItem"
        }    ];

    static getAttributeTypeMap() {
        return PayItems.attributeTypeMap;
    }
}

