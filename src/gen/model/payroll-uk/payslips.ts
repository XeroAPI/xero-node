import { Pagination } from '././pagination';
import { Payslip } from '././payslip';
import { Problem } from '././problem';

export class Payslips {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'paySlips'?: Array<Payslip>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "problem",
            "baseName": "problem",
            "type": "Problem"
        },
        {
            "name": "paySlips",
            "baseName": "paySlips",
            "type": "Array<Payslip>"
        }    ];

    static getAttributeTypeMap() {
        return Payslips.attributeTypeMap;
    }
}

