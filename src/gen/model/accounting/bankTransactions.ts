import { BankTransaction } from '././bankTransaction';

export class BankTransactions {
    'bankTransactions'?: Array<BankTransaction>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "bankTransactions",
            "baseName": "BankTransactions",
            "type": "Array<BankTransaction>"
        }    ];

    static getAttributeTypeMap() {
        return BankTransactions.attributeTypeMap;
    }
}

