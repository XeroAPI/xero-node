import { TaxComponent } from '././taxComponent';

export class TaxRate {
    /**
    * Name of tax rate
    */
    'name'?: string;
    /**
    * The tax type
    */
    'taxType'?: string;
    /**
    * See TaxComponents
    */
    'taxComponents'?: Array<TaxComponent>;
    /**
    * See Status Codes
    */
    'status'?: TaxRate.StatusEnum;
    /**
    * See ReportTaxTypes
    */
    'reportTaxType'?: TaxRate.ReportTaxTypeEnum;
    /**
    * Boolean to describe if tax rate can be used for asset accounts i.e.  true,false
    */
    'canApplyToAssets'?: boolean;
    /**
    * Boolean to describe if tax rate can be used for equity accounts i.e true,false
    */
    'canApplyToEquity'?: boolean;
    /**
    * Boolean to describe if tax rate can be used for expense accounts  i.e. true,false
    */
    'canApplyToExpenses'?: boolean;
    /**
    * Boolean to describe if tax rate can be used for liability accounts  i.e. true,false
    */
    'canApplyToLiabilities'?: boolean;
    /**
    * Boolean to describe if tax rate can be used for revenue accounts i.e. true,false
    */
    'canApplyToRevenue'?: boolean;
    /**
    * Tax Rate (decimal to 4dp) e.g 12.5000
    */
    'displayTaxRate'?: number;
    /**
    * Effective Tax Rate (decimal to 4dp) e.g 12.5000
    */
    'effectiveRate'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        },
        {
            "name": "taxType",
            "baseName": "TaxType",
            "type": "string"
        },
        {
            "name": "taxComponents",
            "baseName": "TaxComponents",
            "type": "Array<TaxComponent>"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "TaxRate.StatusEnum"
        },
        {
            "name": "reportTaxType",
            "baseName": "ReportTaxType",
            "type": "TaxRate.ReportTaxTypeEnum"
        },
        {
            "name": "canApplyToAssets",
            "baseName": "CanApplyToAssets",
            "type": "boolean"
        },
        {
            "name": "canApplyToEquity",
            "baseName": "CanApplyToEquity",
            "type": "boolean"
        },
        {
            "name": "canApplyToExpenses",
            "baseName": "CanApplyToExpenses",
            "type": "boolean"
        },
        {
            "name": "canApplyToLiabilities",
            "baseName": "CanApplyToLiabilities",
            "type": "boolean"
        },
        {
            "name": "canApplyToRevenue",
            "baseName": "CanApplyToRevenue",
            "type": "boolean"
        },
        {
            "name": "displayTaxRate",
            "baseName": "DisplayTaxRate",
            "type": "number"
        },
        {
            "name": "effectiveRate",
            "baseName": "EffectiveRate",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return TaxRate.attributeTypeMap;
    }
}

export namespace TaxRate {
    export enum StatusEnum {
        ACTIVE = <any> 'ACTIVE',
        DELETED = <any> 'DELETED',
        ARCHIVED = <any> 'ARCHIVED',
        PENDING = <any> 'PENDING'
    }
    export enum ReportTaxTypeEnum {
        AVALARA = <any> 'AVALARA',
        BASEXCLUDED = <any> 'BASEXCLUDED',
        CAPITALSALESOUTPUT = <any> 'CAPITALSALESOUTPUT',
        CAPITALEXPENSESINPUT = <any> 'CAPITALEXPENSESINPUT',
        ECOUTPUT = <any> 'ECOUTPUT',
        ECOUTPUTSERVICES = <any> 'ECOUTPUTSERVICES',
        ECINPUT = <any> 'ECINPUT',
        ECACQUISITIONS = <any> 'ECACQUISITIONS',
        EXEMPTEXPENSES = <any> 'EXEMPTEXPENSES',
        EXEMPTINPUT = <any> 'EXEMPTINPUT',
        EXEMPTOUTPUT = <any> 'EXEMPTOUTPUT',
        GSTONIMPORTS = <any> 'GSTONIMPORTS',
        INPUT = <any> 'INPUT',
        INPUTTAXED = <any> 'INPUTTAXED',
        MOSSSALES = <any> 'MOSSSALES',
        NONE = <any> 'NONE',
        NONEOUTPUT = <any> 'NONEOUTPUT',
        OUTPUT = <any> 'OUTPUT',
        PURCHASESINPUT = <any> 'PURCHASESINPUT',
        SALESOUTPUT = <any> 'SALESOUTPUT',
        EXEMPTCAPITAL = <any> 'EXEMPTCAPITAL',
        EXEMPTEXPORT = <any> 'EXEMPTEXPORT',
        CAPITALEXINPUT = <any> 'CAPITALEXINPUT',
        GSTONCAPIMPORTS = <any> 'GSTONCAPIMPORTS',
        GSTONCAPITALIMPORTS = <any> 'GSTONCAPITALIMPORTS',
        REVERSECHARGES = <any> 'REVERSECHARGES',
        PAYMENTS = <any> 'PAYMENTS',
        INVOICE = <any> 'INVOICE',
        CASH = <any> 'CASH',
        ACCRUAL = <any> 'ACCRUAL',
        FLATRATECASH = <any> 'FLATRATECASH',
        FLATRATEACCRUAL = <any> 'FLATRATEACCRUAL',
        ACCRUALS = <any> 'ACCRUALS',
        TXCA = <any> 'TXCA',
        SRCAS = <any> 'SRCAS',
        DSOUTPUT = <any> 'DSOUTPUT',
        BLINPUT2 = <any> 'BLINPUT2',
        EPINPUT = <any> 'EPINPUT',
        IMINPUT2 = <any> 'IMINPUT2',
        MEINPUT = <any> 'MEINPUT',
        IGDSINPUT2 = <any> 'IGDSINPUT2',
        ESN33OUTPUT = <any> 'ESN33OUTPUT',
        OPINPUT = <any> 'OPINPUT',
        OSOUTPUT = <any> 'OSOUTPUT',
        TXN33INPUT = <any> 'TXN33INPUT',
        TXESSINPUT = <any> 'TXESSINPUT',
        TXREINPUT = <any> 'TXREINPUT',
        TXPETINPUT = <any> 'TXPETINPUT',
        NRINPUT = <any> 'NRINPUT',
        ES33OUTPUT = <any> 'ES33OUTPUT',
        ZERORATEDINPUT = <any> 'ZERORATEDINPUT',
        ZERORATEDOUTPUT = <any> 'ZERORATEDOUTPUT',
        DRCHARGESUPPLY = <any> 'DRCHARGESUPPLY',
        DRCHARGE = <any> 'DRCHARGE',
        CAPINPUT = <any> 'CAPINPUT',
        CAPIMPORTS = <any> 'CAPIMPORTS',
        IMINPUT = <any> 'IMINPUT',
        INPUT2 = <any> 'INPUT2',
        CIUINPUT = <any> 'CIUINPUT',
        SRINPUT = <any> 'SRINPUT',
        OUTPUT2 = <any> 'OUTPUT2',
        SROUTPUT = <any> 'SROUTPUT',
        CAPOUTPUT = <any> 'CAPOUTPUT',
        SROUTPUT2 = <any> 'SROUTPUT2',
        CIUOUTPUT = <any> 'CIUOUTPUT',
        ZROUTPUT = <any> 'ZROUTPUT',
        ZREXPORT = <any> 'ZREXPORT',
        ACC28PLUS = <any> 'ACC28PLUS',
        ACCUPTO28 = <any> 'ACCUPTO28',
        OTHEROUTPUT = <any> 'OTHEROUTPUT',
        SHOUTPUT = <any> 'SHOUTPUT',
        ZRINPUT = <any> 'ZRINPUT',
        BADDEBT = <any> 'BADDEBT',
        OTHERINPUT = <any> 'OTHERINPUT'
    }
}
