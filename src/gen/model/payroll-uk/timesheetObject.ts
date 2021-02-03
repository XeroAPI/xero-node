import { Pagination } from '././pagination';
import { Problem } from '././problem';
import { Timesheet } from '././timesheet';

export class TimesheetObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'timesheet'?: Timesheet;

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
            "name": "timesheet",
            "baseName": "timesheet",
            "type": "Timesheet"
        }    ];

    static getAttributeTypeMap() {
        return TimesheetObject.attributeTypeMap;
    }
}

