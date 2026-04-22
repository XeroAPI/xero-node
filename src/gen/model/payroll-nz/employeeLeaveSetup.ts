
export class EmployeeLeaveSetup {
    /**
    * Identifier if holiday pay will be included in each payslip
    */
    'includeHolidayPay'?: boolean;
    /**
    * Initial holiday pay balance. A percentage — usually 8% — of gross earnings since their last work anniversary.
    */
    'holidayPayOpeningBalance'?: number;
    /**
    * Initial annual leave balance. The balance at their last anniversary, less any leave taken since then and excluding accrued annual leave.
    */
    'annualLeaveOpeningBalance'?: number;
    /**
    * The dollar value of annual leave opening balance if negative.
    */
    'negativeAnnualLeaveBalancePaidAmount'?: number;
    /**
    * Number of units accrued annually for sick leave. The type of units is determined by the property \"TypeOfUnitsToAccrue\" on the \"Sick Leave\" leave type
    */
    'sickLeaveToAccrueAnnually'?: number;
    /**
    * Maximum number of units accrued annually for sick leave. The type of units is determined by the property \"TypeOfUnitsToAccrue\" on the \"Sick Leave\" leave type
    */
    'sickLeaveMaximumToAccrue'?: number;
    /**
    * Initial sick leave balance. This will be positive unless they\'ve taken sick leave in advance
    */
    'sickLeaveOpeningBalance'?: number;
    /**
    * Set Schedule of Accrual Type for Sick Leave
    */
    'sickLeaveScheduleOfAccrual'?: string;
    /**
    * If Sick Leave Schedule of Accrual is \"OnAnniversaryDate\", this is the date when entitled to Sick Leave. When null the Employee\'s start date is used as the anniversary date
    */
    'sickLeaveAnniversaryDate'?: string;
    /**
    * The first date the employee will accrue Annual Leave. When null the Employee\'s start date is used as the anniversary date
    */
    'annualLeaveAnniversaryDate'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "includeHolidayPay",
            "baseName": "includeHolidayPay",
            "type": "boolean"
        },
        {
            "name": "holidayPayOpeningBalance",
            "baseName": "holidayPayOpeningBalance",
            "type": "number"
        },
        {
            "name": "annualLeaveOpeningBalance",
            "baseName": "annualLeaveOpeningBalance",
            "type": "number"
        },
        {
            "name": "negativeAnnualLeaveBalancePaidAmount",
            "baseName": "negativeAnnualLeaveBalancePaidAmount",
            "type": "number"
        },
        {
            "name": "sickLeaveToAccrueAnnually",
            "baseName": "SickLeaveToAccrueAnnually",
            "type": "number"
        },
        {
            "name": "sickLeaveMaximumToAccrue",
            "baseName": "SickLeaveMaximumToAccrue",
            "type": "number"
        },
        {
            "name": "sickLeaveOpeningBalance",
            "baseName": "sickLeaveOpeningBalance",
            "type": "number"
        },
        {
            "name": "sickLeaveScheduleOfAccrual",
            "baseName": "SickLeaveScheduleOfAccrual",
            "type": "string"
        },
        {
            "name": "sickLeaveAnniversaryDate",
            "baseName": "SickLeaveAnniversaryDate",
            "type": "string"
        },
        {
            "name": "annualLeaveAnniversaryDate",
            "baseName": "AnnualLeaveAnniversaryDate",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeLeaveSetup.attributeTypeMap;
    }
}

