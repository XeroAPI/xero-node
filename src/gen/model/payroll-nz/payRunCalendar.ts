import { CalendarType } from '././calendarType';

export class PayRunCalendar {
    /**
    * Xero unique identifier for the payroll calendar
    */
    'payrollCalendarID'?: string;
    /**
    * Name of the calendar
    */
    'name': string;
    'calendarType': CalendarType;
    /**
    * Period start date of the calendar
    */
    'periodStartDate': string;
    /**
    * Period end date of the calendar
    */
    'periodEndDate'?: string;
    /**
    * Payment date of the calendar
    */
    'paymentDate': string;
    /**
    * UTC timestamp of the last update to the pay run calendar
    */
    'updatedDateUTC'?: Date;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payrollCalendarID",
            "baseName": "payrollCalendarID",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "calendarType",
            "baseName": "calendarType",
            "type": "CalendarType"
        },
        {
            "name": "periodStartDate",
            "baseName": "periodStartDate",
            "type": "string"
        },
        {
            "name": "periodEndDate",
            "baseName": "periodEndDate",
            "type": "string"
        },
        {
            "name": "paymentDate",
            "baseName": "paymentDate",
            "type": "string"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "updatedDateUTC",
            "type": "Date"
        }    ];

    static getAttributeTypeMap() {
        return PayRunCalendar.attributeTypeMap;
    }
}

