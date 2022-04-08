import { Pagination } from '././pagination';
import { PaySlip } from '././paySlip';
import { Problem } from '././problem';

export class PaySlips {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'paySlips'?: Array<PaySlip>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        }        {
            "name": "problem",
            "baseName": "problem",
            "type": "Problem"
        }        {
            "name": "paySlips",
            "baseName": "paySlips",
            "type": "Array<PaySlip>"
        }    ];

    static getAttributeTypeMap() {
        return PaySlips.attributeTypeMap;
    }
}

