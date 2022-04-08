import { Pagination } from '././pagination';
import { Payslip } from '././payslip';
import { Problem } from '././problem';

export class PayslipObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'paySlip'?: Payslip;

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
            "name": "paySlip",
            "baseName": "paySlip",
            "type": "Payslip"
        }    ];

    static getAttributeTypeMap() {
        return PayslipObject.attributeTypeMap;
    }
}

