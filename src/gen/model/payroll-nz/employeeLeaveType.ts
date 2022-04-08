
export class EmployeeLeaveType {
    /**
    * The Xero identifier for leave type
    */
    'leaveTypeID'?: string;
    /**
    * The schedule of accrual
    */
    'scheduleOfAccrual'?: EmployeeLeaveType.ScheduleOfAccrualEnum;
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
    * Specific for scheduleOfAccrual having percentage of gross earnings. Identifies how much percentage of gross earnings is accrued per pay period.
    */
    'percentageOfGrossEarnings'?: number;
    /**
    * Specific to Holiday pay. Flag determining if pay for leave type is added on each pay run.
    */
    'includeHolidayPayEveryPay'?: boolean;
    /**
    * Specific to Annual Leave. Flag to include leave available to take in advance in the balance in the payslip
    */
    'showAnnualLeaveInAdvance'?: boolean;
    /**
    * Specific to Annual Leave. Annual leave balance in dollars
    */
    'annualLeaveTotalAmountPaid'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "leaveTypeID",
            "baseName": "leaveTypeID",
            "type": "string"
        }        {
            "name": "scheduleOfAccrual",
            "baseName": "scheduleOfAccrual",
            "type": "EmployeeLeaveType.ScheduleOfAccrualEnum"
        }        {
            "name": "hoursAccruedAnnually",
            "baseName": "hoursAccruedAnnually",
            "type": "number"
        }        {
            "name": "maximumToAccrue",
            "baseName": "maximumToAccrue",
            "type": "number"
        }        {
            "name": "openingBalance",
            "baseName": "openingBalance",
            "type": "number"
        }        {
            "name": "rateAccruedHourly",
            "baseName": "rateAccruedHourly",
            "type": "number"
        }        {
            "name": "percentageOfGrossEarnings",
            "baseName": "percentageOfGrossEarnings",
            "type": "number"
        }        {
            "name": "includeHolidayPayEveryPay",
            "baseName": "includeHolidayPayEveryPay",
            "type": "boolean"
        }        {
            "name": "showAnnualLeaveInAdvance",
            "baseName": "showAnnualLeaveInAdvance",
            "type": "boolean"
        }        {
            "name": "annualLeaveTotalAmountPaid",
            "baseName": "annualLeaveTotalAmountPaid",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeLeaveType.attributeTypeMap;
    }
}

export namespace EmployeeLeaveType {
    export enum ScheduleOfAccrualEnum {
        AnnuallyAfter6Months = <any> 'AnnuallyAfter6Months',
        OnAnniversaryDate = <any> 'OnAnniversaryDate',
        PercentageOfGrossEarnings = <any> 'PercentageOfGrossEarnings',
        NoAccruals = <any> 'NoAccruals'
    }
}
