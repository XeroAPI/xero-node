
export class EmployeeLeaveType {
    /**
    * The Xero identifier for leave type
    */
    'leaveTypeID': string;
    /**
    * The schedule of accrual
    */
    'scheduleOfAccrual': EmployeeLeaveType.ScheduleOfAccrualEnum;
    /**
    * The number of hours accrued for the leave annually. This is 0 when the scheduleOfAccrual chosen is \"OnHourWorked\"
    */
    'hoursAccruedAnnually'?: number;
    /**
    * The maximum number of hours that can be accrued for the leave
    */
    'maximumToAccrue'?: number;
    /**
    * The initial number of hours assigned when the leave was added to the employee
    */
    'openingBalance'?: number;
    /**
    * The number of hours added to the leave balance for every hour worked by the employee. This is normally 0, unless the scheduleOfAccrual chosen is \"OnHourWorked\"
    */
    'rateAccruedHourly'?: number;
    /**
    * The date when an employee becomes entitled to their accrual. Only applicable when scheduleOfAccrual is \"OnAnniversaryDate\"
    */
    'scheduleOfAccrualDate'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "leaveTypeID",
            "baseName": "leaveTypeID",
            "type": "string"
        },
        {
            "name": "scheduleOfAccrual",
            "baseName": "scheduleOfAccrual",
            "type": "EmployeeLeaveType.ScheduleOfAccrualEnum"
        },
        {
            "name": "hoursAccruedAnnually",
            "baseName": "hoursAccruedAnnually",
            "type": "number"
        },
        {
            "name": "maximumToAccrue",
            "baseName": "maximumToAccrue",
            "type": "number"
        },
        {
            "name": "openingBalance",
            "baseName": "openingBalance",
            "type": "number"
        },
        {
            "name": "rateAccruedHourly",
            "baseName": "rateAccruedHourly",
            "type": "number"
        },
        {
            "name": "scheduleOfAccrualDate",
            "baseName": "scheduleOfAccrualDate",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeLeaveType.attributeTypeMap;
    }
}

export namespace EmployeeLeaveType {
    export enum ScheduleOfAccrualEnum {
        BeginningOfCalendarYear = <any> 'BeginningOfCalendarYear',
        OnAnniversaryDate = <any> 'OnAnniversaryDate',
        EachPayPeriod = <any> 'EachPayPeriod',
        OnHourWorked = <any> 'OnHourWorked'
    }
}
