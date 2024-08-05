import { BankTransaction } from '././bankTransaction';
import { Pagination } from '././pagination';
import { ValidationError } from '././validationError';

export class BankTransactions {
    'pagination'?: Pagination;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    'bankTransactions'?: Array<BankTransaction>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "warnings",
            "baseName": "Warnings",
            "type": "Array<ValidationError>"
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

