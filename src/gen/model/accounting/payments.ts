import { Pagination } from '././pagination';
import { Payment } from '././payment';
import { ValidationError } from '././validationError';

export class Payments {
    'pagination'?: Pagination;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    'payments'?: Array<Payment>;

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
            "name": "payments",
            "baseName": "Payments",
            "type": "Array<Payment>"
        }    ];

    static getAttributeTypeMap() {
        return Payments.attributeTypeMap;
    }
}

