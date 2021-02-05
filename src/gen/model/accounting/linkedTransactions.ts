import { LinkedTransaction } from '././linkedTransaction';

export class LinkedTransactions {
    'linkedTransactions'?: Array<LinkedTransaction>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "linkedTransactions",
            "baseName": "LinkedTransactions",
            "type": "Array<LinkedTransaction>"
        }    ];

    static getAttributeTypeMap() {
        return LinkedTransactions.attributeTypeMap;
    }
}

