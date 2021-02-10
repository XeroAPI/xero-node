import { Pagination } from '././pagination';
import { Problem } from '././problem';
import { Reimbursement } from '././reimbursement';

export class ReimbursementObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'reimbursement'?: Reimbursement;

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
            "name": "reimbursement",
            "baseName": "reimbursement",
            "type": "Reimbursement"
        }    ];

    static getAttributeTypeMap() {
        return ReimbursementObject.attributeTypeMap;
    }
}

