import { Pagination } from '././pagination';
import { Problem } from '././problem';
import { TimesheetLine } from '././timesheetLine';

export class TimesheetLineObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'timesheetLine'?: TimesheetLine;

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
            "name": "timesheetLine",
            "baseName": "timesheetLine",
            "type": "TimesheetLine"
        }    ];

    static getAttributeTypeMap() {
        return TimesheetLineObject.attributeTypeMap;
    }
}

