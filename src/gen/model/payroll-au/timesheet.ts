import { TimesheetLine } from '././timesheetLine';
import { TimesheetStatus } from '././timesheetStatus';
import { ValidationError } from '././validationError';

export class Timesheet {
    /**
    * The Xero identifier for an employee
    */
    'employeeID': string;
    /**
    * Period start date (YYYY-MM-DD)
    */
    'startDate': string;
    /**
    * Period end date (YYYY-MM-DD)
    */
    'endDate': string;
    'status'?: TimesheetStatus;
    /**
    * Timesheet total hours
    */
    'hours'?: number;
    /**
    * The Xero identifier for a Payroll Timesheet
    */
    'timesheetID'?: string;
    'timesheetLines'?: Array<TimesheetLine>;
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
            "name": "employeeID",
            "baseName": "EmployeeID",
            "type": "string"
        },
        {
            "name": "startDate",
            "baseName": "StartDate",
            "type": "string"
        },
        {
            "name": "endDate",
            "baseName": "EndDate",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "TimesheetStatus"
        },
        {
            "name": "hours",
            "baseName": "Hours",
            "type": "number"
        },
        {
            "name": "timesheetID",
            "baseName": "TimesheetID",
            "type": "string"
        },
        {
            "name": "timesheetLines",
            "baseName": "TimesheetLines",
            "type": "Array<TimesheetLine>"
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
        return Timesheet.attributeTypeMap;
    }
}

