import { Timesheet } from '././timesheet';

export class TimesheetObject {
    'timesheet'?: Timesheet;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "timesheet",
            "baseName": "Timesheet",
            "type": "Timesheet"
        }    ];

    static getAttributeTypeMap() {
        return TimesheetObject.attributeTypeMap;
    }
}

