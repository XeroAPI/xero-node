import { TaxComponent } from './taxComponent';
export declare class TaxRate {
    'name'?: string;
    'taxType'?: string;
    'taxComponents'?: Array<TaxComponent>;
    'status'?: TaxRate.StatusEnum;
    'reportTaxType': TaxRate.ReportTaxTypeEnum;
    'canApplyToAssets'?: boolean;
    'canApplyToEquity'?: boolean;
    'canApplyToExpenses'?: boolean;
    'canApplyToLiabilities'?: boolean;
    'canApplyToRevenue'?: boolean;
    'displayTaxRate'?: number;
    'effectiveRate'?: number;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare namespace TaxRate {
    enum StatusEnum {
        ACTIVE,
        DELETED,
        ARCHIVED,
        PENDING
    }
    enum ReportTaxTypeEnum {
        AVALARA,
        BASEXCLUDED,
        CAPITALSALESOUTPUT,
        CAPITALEXPENSESINPUT,
        ECOUTPUT,
        ECOUTPUTSERVICES,
        ECINPUT,
        ECACQUISITIONS,
        EXEMPTEXPENSES,
        EXEMPTINPUT,
        EXEMPTOUTPUT,
        GSTONIMPORTS,
        INPUT,
        INPUTTAXED,
        MOSSSALES,
        NONE,
        NONEOUTPUT,
        OUTPUT,
        PURCHASESINPUT,
        SALESOUTPUT,
        EXEMPTCAPITAL,
        EXEMPTEXPORT,
        CAPITALEXINPUT,
        GSTONCAPIMPORTS,
        REVERSECHARGES,
        PAYMENTS,
        INVOICE,
        CASH,
        ACCRUAL,
        FLATRATECASH,
        FLATRATEACCRUAL,
        ACCRUALS
    }
}
