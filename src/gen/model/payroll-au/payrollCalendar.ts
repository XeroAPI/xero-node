import { CalendarType } from '././calendarType';
import { ValidationError } from '././validationError';

export class PayrollCalendar {
    /**
    * Name of the Payroll Calendar
    */
    'name'?: string;
    'calendarType'?: CalendarType;
    /**
    * The start date of the upcoming pay period. The end date will be calculated based upon this date, and the calendar type selected (YYYY-MM-DD)
    */
    'startDate'?: string;
    /**
    * The date on which employees will be paid for the upcoming pay period (YYYY-MM-DD)
    */
    'paymentDate'?: string;
    /**
    * Xero identifier
    */
    'payrollCalendarID'?: string;
    /**
    * Last modified timestamp
    */
    'updatedDateUTC'?: Date;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        },
        {
            "name": "calendarType",
            "baseName": "CalendarType",
            "type": "CalendarType"
        },
        {
            "name": "startDate",
            "baseName": "StartDate",
            "type": "string"
        },
        {
            "name": "paymentDate",
            "baseName": "PaymentDate",
            "type": "string"
        },
        {
            "name": "payrollCalendarID",
            "baseName": "PayrollCalendarID",
            "type": "string"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        }    ];

    static getAttributeTypeMap() {
        return PayrollCalendar.attributeTypeMap;
    }
}

