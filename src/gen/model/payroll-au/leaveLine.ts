import { EmploymentTerminationPaymentType } from '././employmentTerminationPaymentType';
import { EntitlementFinalPayPayoutType } from '././entitlementFinalPayPayoutType';
import { LeaveLineCalculationType } from '././leaveLineCalculationType';

export class LeaveLine {
    /**
    * Xero leave type identifier
    */
    'leaveTypeID'?: string;
    'calculationType'?: LeaveLineCalculationType;
    'entitlementFinalPayPayoutType'?: EntitlementFinalPayPayoutType;
    'employmentTerminationPaymentType'?: EmploymentTerminationPaymentType;
    /**
    * amount of leave line
    */
    'includeSuperannuationGuaranteeContribution'?: boolean;
    /**
    * Number of units for leave line.
    */
    'numberOfUnits'?: number;
    /**
    * Hours of leave accrued each year
    */
    'annualNumberOfUnits'?: number;
    /**
    * Normal ordinary earnings number of units for leave line.
    */
    'fullTimeNumberOfUnitsPerPeriod'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "leaveTypeID",
            "baseName": "LeaveTypeID",
            "type": "string"
        },
        {
            "name": "calculationType",
            "baseName": "CalculationType",
            "type": "LeaveLineCalculationType"
        },
        {
            "name": "entitlementFinalPayPayoutType",
            "baseName": "EntitlementFinalPayPayoutType",
            "type": "EntitlementFinalPayPayoutType"
        },
        {
            "name": "employmentTerminationPaymentType",
            "baseName": "EmploymentTerminationPaymentType",
            "type": "EmploymentTerminationPaymentType"
        },
        {
            "name": "includeSuperannuationGuaranteeContribution",
            "baseName": "IncludeSuperannuationGuaranteeContribution",
            "type": "boolean"
        },
        {
            "name": "numberOfUnits",
            "baseName": "NumberOfUnits",
            "type": "number"
        },
        {
            "name": "annualNumberOfUnits",
            "baseName": "AnnualNumberOfUnits",
            "type": "number"
        },
        {
            "name": "fullTimeNumberOfUnitsPerPeriod",
            "baseName": "FullTimeNumberOfUnitsPerPeriod",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return LeaveLine.attributeTypeMap;
    }
}

