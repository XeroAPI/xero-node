import { BankTransaction } from '././bankTransaction';
import { Pagination } from '././pagination';

export class BankTransactions {
    'pagination'?: Pagination;
    'bankTransactions'?: Array<BankTransaction>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "bankTransactions",
            "baseName": "BankTransactions",
            "type": "Array<BankTransaction>"
        }    ];

    static getAttributeTypeMap() {
        return BankTransactions.attributeTypeMap;
    }
}

