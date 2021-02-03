import { ReimbursementLine } from '././reimbursementLine';

/**
* The reimbursement type lines
*/
export class ReimbursementLines {
    'reimbursementLines'?: Array<ReimbursementLine>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "reimbursementLines",
            "baseName": "ReimbursementLines",
            "type": "Array<ReimbursementLine>"
        }    ];

    static getAttributeTypeMap() {
        return ReimbursementLines.attributeTypeMap;
    }
}

