import { Pagination } from '././pagination';
import { TimeEntry } from '././timeEntry';

export class TimeEntries {
    'pagination'?: Pagination;
    'items'?: Array<TimeEntry>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "items",
            "baseName": "items",
            "type": "Array<TimeEntry>"
        }    ];

    static getAttributeTypeMap() {
        return TimeEntries.attributeTypeMap;
    }
}

