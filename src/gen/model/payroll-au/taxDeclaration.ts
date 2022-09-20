import { EmploymentBasis } from '././employmentBasis';
import { ResidencyStatus } from '././residencyStatus';
import { SeniorMaritalStatus } from '././seniorMaritalStatus';
import { TFNExemptionType } from '././tFNExemptionType';
import { TaxScaleType } from '././taxScaleType';
import { WorkCondition } from '././workCondition';

export class TaxDeclaration {
    /**
    * Address line 1 for employee home address
    */
    'employeeID'?: string;
    'employmentBasis'?: EmploymentBasis;
    'tFNExemptionType'?: TFNExemptionType;
    /**
    * The tax file number e.g 123123123.
    */
    'taxFileNumber'?: string;
    /**
    * 11-digit Australian Business Number e.g 21006819692 or an empty string (\"\") to unset a previously set value. Only applicable, and mandatory if income type is NONEMPLOYEE.
    */
    'aBN'?: string;
    /**
    * If the employee is Australian resident for tax purposes. e.g true or false
    */
    'australianResidentForTaxPurposes'?: boolean;
    'residencyStatus'?: ResidencyStatus;
    'taxScaleType'?: TaxScaleType;
    'workCondition'?: WorkCondition;
    'seniorMaritalStatus'?: SeniorMaritalStatus;
    /**
    * If tax free threshold claimed. e.g true or false
    */
    'taxFreeThresholdClaimed'?: boolean;
    /**
    * If has tax offset estimated then the tax offset estimated amount. e.g 100
    */
    'taxOffsetEstimatedAmount'?: number;
    /**
    * If employee has HECS or HELP debt. e.g true or false
    */
    'hasHELPDebt'?: boolean;
    /**
    * If employee has financial supplement debt. e.g true or false
    */
    'hasSFSSDebt'?: boolean;
    /**
    * If employee has trade support loan. e.g true or false
    */
    'hasTradeSupportLoanDebt'?: boolean;
    /**
    * If the employee has requested that additional tax be withheld each pay run. e.g 50
    */
    'upwardVariationTaxWithholdingAmount'?: number;
    /**
    * If the employee is eligible to receive an additional percentage on top of ordinary earnings when they take leave (typically 17.5%). e.g true or false
    */
    'eligibleToReceiveLeaveLoading'?: boolean;
    /**
    * If the employee has approved withholding variation. e.g (0 - 100)
    */
    'approvedWithholdingVariationPercentage'?: number;
    /**
    * If the employee is eligible for student startup loan rules
    */
    'hasStudentStartupLoan'?: boolean;
    /**
    * If the employee has any of the following loans or debts: Higher Education Loan Program (HELP/HECS), VET Student Loan (VSL), Financial Supplement (FS), Student Start-up Loan (SSL), or Trade Support Loan (TSL)
    */
    'hasLoanOrStudentDebt'?: boolean;
    /**
    * Last modified timestamp
    */
    'updatedDateUTC'?: Date;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "employeeID",
            "baseName": "EmployeeID",
            "type": "string"
        },
        {
            "name": "employmentBasis",
            "baseName": "EmploymentBasis",
            "type": "EmploymentBasis"
        },
        {
            "name": "tFNExemptionType",
            "baseName": "TFNExemptionType",
            "type": "TFNExemptionType"
        },
        {
            "name": "taxFileNumber",
            "baseName": "TaxFileNumber",
            "type": "string"
        },
        {
            "name": "aBN",
            "baseName": "ABN",
            "type": "string"
        },
        {
            "name": "australianResidentForTaxPurposes",
            "baseName": "AustralianResidentForTaxPurposes",
            "type": "boolean"
        },
        {
            "name": "residencyStatus",
            "baseName": "ResidencyStatus",
            "type": "ResidencyStatus"
        },
        {
            "name": "taxScaleType",
            "baseName": "TaxScaleType",
            "type": "TaxScaleType"
        },
        {
            "name": "workCondition",
            "baseName": "WorkCondition",
            "type": "WorkCondition"
        },
        {
            "name": "seniorMaritalStatus",
            "baseName": "SeniorMaritalStatus",
            "type": "SeniorMaritalStatus"
        },
        {
            "name": "taxFreeThresholdClaimed",
            "baseName": "TaxFreeThresholdClaimed",
            "type": "boolean"
        },
        {
            "name": "taxOffsetEstimatedAmount",
            "baseName": "TaxOffsetEstimatedAmount",
            "type": "number"
        },
        {
            "name": "hasHELPDebt",
            "baseName": "HasHELPDebt",
            "type": "boolean"
        },
        {
            "name": "hasSFSSDebt",
            "baseName": "HasSFSSDebt",
            "type": "boolean"
        },
        {
            "name": "hasTradeSupportLoanDebt",
            "baseName": "HasTradeSupportLoanDebt",
            "type": "boolean"
        },
        {
            "name": "upwardVariationTaxWithholdingAmount",
            "baseName": "UpwardVariationTaxWithholdingAmount",
            "type": "number"
        },
        {
            "name": "eligibleToReceiveLeaveLoading",
            "baseName": "EligibleToReceiveLeaveLoading",
            "type": "boolean"
        },
        {
            "name": "approvedWithholdingVariationPercentage",
            "baseName": "ApprovedWithholdingVariationPercentage",
            "type": "number"
        },
        {
            "name": "hasStudentStartupLoan",
            "baseName": "HasStudentStartupLoan",
            "type": "boolean"
        },
        {
            "name": "hasLoanOrStudentDebt",
            "baseName": "HasLoanOrStudentDebt",
            "type": "boolean"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        }    ];

    static getAttributeTypeMap() {
        return TaxDeclaration.attributeTypeMap;
    }
}

