
export class SalaryAndWage {
    /**
    * Xero unique identifier for a salary and wages record
    */
    'salaryAndWagesID'?: string;
    /**
    * Xero unique identifier for an earnings rate
    */
    'earningsRateID': string;
    /**
    * The Number of Units per week for the corresponding salary and wages
    */
    'numberOfUnitsPerWeek': number;
    /**
    * The rate of each unit for the corresponding salary and wages
    */
    'ratePerUnit'?: number;
    /**
    * The Number of Units per day for the corresponding salary and wages
    */
    'numberOfUnitsPerDay': number;
    /**
    * The days per week for the salary.
    */
    'daysPerWeek'?: number;
    /**
    * The effective date of the corresponding salary and wages
    */
    'effectiveFrom': string;
    /**
    * The annual salary
    */
    'annualSalary': number;
    /**
    * The current status of the corresponding salary and wages
    */
    'status': SalaryAndWage.StatusEnum;
    /**
    * The type of the payment of the corresponding salary and wages
    */
    'paymentType': SalaryAndWage.PaymentTypeEnum;
    /**
    * The type of the Working Pattern of the corresponding salary and wages
    */
    'workPatternType'?: SalaryAndWage.WorkPatternTypeEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "salaryAndWagesID",
            "baseName": "salaryAndWagesID",
            "type": "string"
        },
        {
            "name": "earningsRateID",
            "baseName": "earningsRateID",
            "type": "string"
        },
        {
            "name": "numberOfUnitsPerWeek",
            "baseName": "numberOfUnitsPerWeek",
            "type": "number"
        },
        {
            "name": "ratePerUnit",
            "baseName": "ratePerUnit",
            "type": "number"
        },
        {
            "name": "numberOfUnitsPerDay",
            "baseName": "numberOfUnitsPerDay",
            "type": "number"
        },
        {
            "name": "daysPerWeek",
            "baseName": "daysPerWeek",
            "type": "number"
        },
        {
            "name": "effectiveFrom",
            "baseName": "effectiveFrom",
            "type": "string"
        },
        {
            "name": "annualSalary",
            "baseName": "annualSalary",
            "type": "number"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "SalaryAndWage.StatusEnum"
        },
        {
            "name": "paymentType",
            "baseName": "paymentType",
            "type": "SalaryAndWage.PaymentTypeEnum"
        },
        {
            "name": "workPatternType",
            "baseName": "workPatternType",
            "type": "SalaryAndWage.WorkPatternTypeEnum"
        }    ];

    static getAttributeTypeMap() {
        return SalaryAndWage.attributeTypeMap;
    }
}

export namespace SalaryAndWage {
    export enum StatusEnum {
        Active = <any> 'Active',
        Pending = <any> 'Pending',
        History = <any> 'History'
    }
    export enum PaymentTypeEnum {
        Salary = <any> 'Salary',
        Hourly = <any> 'Hourly'
    }
    export enum WorkPatternTypeEnum {
        DaysAndHours = <any> 'DaysAndHours',
        RegularWeek = <any> 'RegularWeek'
    }
}
