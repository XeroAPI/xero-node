import { DeductionLine } from '././deductionLine';
import { EarningsLine } from '././earningsLine';
import { LeaveLine } from '././leaveLine';
import { ReimbursementLine } from '././reimbursementLine';
import { SuperLine } from '././superLine';

export class OpeningBalances {
    /**
    * Opening Balance Date. (YYYY-MM-DD)
    */
    'openingBalanceDate'?: string;
    /**
    * Opening Balance tax
    */
    'tax'?: string;
    'earningsLines'?: Array<EarningsLine>;
    'deductionLines'?: Array<DeductionLine>;
    'superLines'?: Array<SuperLine>;
    'reimbursementLines'?: Array<ReimbursementLine>;
    'leaveLines'?: Array<LeaveLine>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "openingBalanceDate",
            "baseName": "OpeningBalanceDate",
            "type": "string"
        }        {
            "name": "tax",
            "baseName": "Tax",
            "type": "string"
        }        {
            "name": "earningsLines",
            "baseName": "EarningsLines",
            "type": "Array<EarningsLine>"
        }        {
            "name": "deductionLines",
            "baseName": "DeductionLines",
            "type": "Array<DeductionLine>"
        }        {
            "name": "superLines",
            "baseName": "SuperLines",
            "type": "Array<SuperLine>"
        }        {
            "name": "reimbursementLines",
            "baseName": "ReimbursementLines",
            "type": "Array<ReimbursementLine>"
        }        {
            "name": "leaveLines",
            "baseName": "LeaveLines",
            "type": "Array<LeaveLine>"
        }    ];

    static getAttributeTypeMap() {
        return OpeningBalances.attributeTypeMap;
    }
}

