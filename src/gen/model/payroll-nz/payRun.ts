import { CalendarType } from '././calendarType';
import { PaySlip } from '././paySlip';

export class PayRun {
    /**
    * Xero unique identifier for the pay run
    */
    'payRunID'?: string;
    /**
    * Xero unique identifier for the payroll calendar
    */
    'payrollCalendarID'?: string;
    /**
    * Period start date of the payroll calendar
    */
    'periodStartDate'?: string;
    /**
    * Period end date of the payroll calendar
    */
    'periodEndDate'?: string;
    /**
    * Payment date of the pay run
    */
    'paymentDate'?: string;
    /**
    * Total cost of the pay run
    */
    'totalCost'?: number;
    /**
    * Total pay of the pay run
    */
    'totalPay'?: number;
    /**
    * Pay run status
    */
    'payRunStatus'?: PayRun.PayRunStatusEnum;
    /**
    * Pay run type
    */
    'payRunType'?: PayRun.PayRunTypeEnum;
    'calendarType'?: CalendarType;
    /**
    * Posted date time of the pay run
    */
    'postedDateTime'?: string;
    'paySlips'?: Array<PaySlip>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payRunID",
            "baseName": "payRunID",
            "type": "string"
        },
        {
            "name": "payrollCalendarID",
            "baseName": "payrollCalendarID",
            "type": "string"
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
            "name": "totalCost",
            "baseName": "totalCost",
            "type": "number"
        },
        {
            "name": "totalPay",
            "baseName": "totalPay",
            "type": "number"
        },
        {
            "name": "payRunStatus",
            "baseName": "payRunStatus",
            "type": "PayRun.PayRunStatusEnum"
        },
        {
            "name": "payRunType",
            "baseName": "payRunType",
            "type": "PayRun.PayRunTypeEnum"
        },
        {
            "name": "calendarType",
            "baseName": "calendarType",
            "type": "CalendarType"
        },
        {
            "name": "postedDateTime",
            "baseName": "postedDateTime",
            "type": "string"
        },
        {
            "name": "paySlips",
            "baseName": "paySlips",
            "type": "Array<PaySlip>"
        }    ];

    static getAttributeTypeMap() {
        return PayRun.attributeTypeMap;
    }
}

export namespace PayRun {
    export enum PayRunStatusEnum {
        Draft = <any> 'Draft',
        Posted = <any> 'Posted'
    }
    export enum PayRunTypeEnum {
        Scheduled = <any> 'Scheduled',
        Unscheduled = <any> 'Unscheduled',
        EarlierYearUpdate = <any> 'EarlierYearUpdate'
    }
}
