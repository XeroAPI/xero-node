import { LeaveType } from '././leaveType';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class LeaveTypeObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'leaveType'?: LeaveType;

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
            "name": "leaveType",
            "baseName": "leaveType",
            "type": "LeaveType"
        }    ];

    static getAttributeTypeMap() {
        return LeaveTypeObject.attributeTypeMap;
    }
}

