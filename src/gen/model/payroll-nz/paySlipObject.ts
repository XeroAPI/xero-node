import { Pagination } from '././pagination';
import { PaySlip } from '././paySlip';
import { Problem } from '././problem';

export class PaySlipObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'paySlip'?: PaySlip;

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
            "name": "paySlip",
            "baseName": "paySlip",
            "type": "PaySlip"
        }    ];

    static getAttributeTypeMap() {
        return PaySlipObject.attributeTypeMap;
    }
}

