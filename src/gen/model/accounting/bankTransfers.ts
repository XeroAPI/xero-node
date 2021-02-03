import { BankTransfer } from '././bankTransfer';

export class BankTransfers {
    'bankTransfers'?: Array<BankTransfer>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "bankTransfers",
            "baseName": "BankTransfers",
            "type": "Array<BankTransfer>"
        }    ];

    static getAttributeTypeMap() {
        return BankTransfers.attributeTypeMap;
    }
}

