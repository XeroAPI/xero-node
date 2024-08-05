import { Pagination } from '././pagination';
import { Prepayment } from '././prepayment';
import { ValidationError } from '././validationError';

export class Prepayments {
    'pagination'?: Pagination;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    'prepayments'?: Array<Prepayment>;

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
            "name": "prepayments",
            "baseName": "Prepayments",
            "type": "Array<Prepayment>"
        }    ];

    static getAttributeTypeMap() {
        return Prepayments.attributeTypeMap;
    }
}

