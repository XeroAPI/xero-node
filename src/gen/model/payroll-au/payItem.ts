import { DeductionType } from '././deductionType';
import { EarningsRate } from '././earningsRate';
import { LeaveType } from '././leaveType';
import { ReimbursementType } from '././reimbursementType';

export class PayItem {
    'earningsRates'?: Array<EarningsRate>;
    'deductionTypes'?: Array<DeductionType>;
    'leaveTypes'?: Array<LeaveType>;
    'reimbursementTypes'?: Array<ReimbursementType>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "earningsRates",
            "baseName": "EarningsRates",
            "type": "Array<EarningsRate>"
        }        {
            "name": "deductionTypes",
            "baseName": "DeductionTypes",
            "type": "Array<DeductionType>"
        }        {
            "name": "leaveTypes",
            "baseName": "LeaveTypes",
            "type": "Array<LeaveType>"
        }        {
            "name": "reimbursementTypes",
            "baseName": "ReimbursementTypes",
            "type": "Array<ReimbursementType>"
        }    ];

    static getAttributeTypeMap() {
        return PayItem.attributeTypeMap;
    }
}

