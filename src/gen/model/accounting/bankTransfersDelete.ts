import { BankTransferDelete } from '././bankTransferDelete';

export class BankTransfersDelete {
    'bankTransfers'?: Array<BankTransferDelete>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "bankTransfers",
            "baseName": "BankTransfers",
            "type": "Array<BankTransferDelete>"
        }    ];

    static getAttributeTypeMap() {
        return BankTransfersDelete.attributeTypeMap;
    }
}

