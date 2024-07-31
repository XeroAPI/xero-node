import { Overpayment } from '././overpayment';
import { Pagination } from '././pagination';
import { ValidationError } from '././validationError';

export class Overpayments {
    'pagination'?: Pagination;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    'overpayments'?: Array<Overpayment>;

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
            "name": "overpayments",
            "baseName": "Overpayments",
            "type": "Array<Overpayment>"
        }    ];

    static getAttributeTypeMap() {
        return Overpayments.attributeTypeMap;
    }
}

