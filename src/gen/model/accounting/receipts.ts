import { Receipt } from '././receipt';

export class Receipts {
    'receipts'?: Array<Receipt>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "receipts",
            "baseName": "Receipts",
            "type": "Array<Receipt>"
        }    ];

    static getAttributeTypeMap() {
        return Receipts.attributeTypeMap;
    }
}

