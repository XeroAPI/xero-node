import { Pagination } from '././pagination';
import { Problem } from '././problem';
import { Timesheet } from '././timesheet';

export class Timesheets {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'timesheets'?: Array<Timesheet>;

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
            "name": "timesheets",
            "baseName": "timesheets",
            "type": "Array<Timesheet>"
        }    ];

    static getAttributeTypeMap() {
        return Timesheets.attributeTypeMap;
    }
}

