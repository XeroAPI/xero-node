import { Pagination } from '././pagination';
import { PayRunCalendar } from '././payRunCalendar';
import { Problem } from '././problem';

export class PayRunCalendarObject {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'payRunCalendar'?: PayRunCalendar;

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
            "name": "payRunCalendar",
            "baseName": "payRunCalendar",
            "type": "PayRunCalendar"
        }    ];

    static getAttributeTypeMap() {
        return PayRunCalendarObject.attributeTypeMap;
    }
}

