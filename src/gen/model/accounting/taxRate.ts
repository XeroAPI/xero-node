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
        }        {
            "name": "taxType",
            "baseName": "TaxType",
            "type": "string"
        }        {
            "name": "taxComponents",
            "baseName": "TaxComponents",
            "type": "Array<TaxComponent>"
        }        {
            "name": "status",
            "baseName": "Status",
            "type": "TaxRate.StatusEnum"
        }        {
            "name": "reportTaxType",
            "baseName": "ReportTaxType",
            "type": "TaxRate.ReportTaxTypeEnum"
        }        {
            "name": "canApplyToAssets",
            "baseName": "CanApplyToAssets",
            "type": "boolean"
        }        {
            "name": "canApplyToEquity",
            "baseName": "CanApplyToEquity",
            "type": "boolean"
        }        {
            "name": "canApplyToExpenses",
            "baseName": "CanApplyToExpenses",
            "type": "boolean"
        }        {
            "name": "canApplyToLiabilities",
            "baseName": "CanApplyToLiabilities",
            "type": "boolean"
        }        {
            "name": "canApplyToRevenue",
            "baseName": "CanApplyToRevenue",
            "type": "boolean"
        }        {
            "name": "displayTaxRate",
            "baseName": "DisplayTaxRate",
            "type": "number"
        }        {
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
        Active = <any> 'ACTIVE',
        Deleted = <any> 'DELETED',
        Archived = <any> 'ARCHIVED',
        Pending = <any> 'PENDING'
    }
    export enum ReportTaxTypeEnum {
        Avalara = <any> 'AVALARA',
        Basexcluded = <any> 'BASEXCLUDED',
        Capitalsalesoutput = <any> 'CAPITALSALESOUTPUT',
        Capitalexpensesinput = <any> 'CAPITALEXPENSESINPUT',
        Ecoutput = <any> 'ECOUTPUT',
        Ecoutputservices = <any> 'ECOUTPUTSERVICES',
        Ecinput = <any> 'ECINPUT',
        Ecacquisitions = <any> 'ECACQUISITIONS',
        Exemptexpenses = <any> 'EXEMPTEXPENSES',
        Exemptinput = <any> 'EXEMPTINPUT',
        Exemptoutput = <any> 'EXEMPTOUTPUT',
        Gstonimports = <any> 'GSTONIMPORTS',
        Input = <any> 'INPUT',
        Inputtaxed = <any> 'INPUTTAXED',
        Mosssales = <any> 'MOSSSALES',
        None = <any> 'NONE',
        Noneoutput = <any> 'NONEOUTPUT',
        Output = <any> 'OUTPUT',
        Purchasesinput = <any> 'PURCHASESINPUT',
        Salesoutput = <any> 'SALESOUTPUT',
        Exemptcapital = <any> 'EXEMPTCAPITAL',
        Exemptexport = <any> 'EXEMPTEXPORT',
        Capitalexinput = <any> 'CAPITALEXINPUT',
        Gstoncapimports = <any> 'GSTONCAPIMPORTS',
        Gstoncapitalimports = <any> 'GSTONCAPITALIMPORTS',
        Reversecharges = <any> 'REVERSECHARGES',
        Payments = <any> 'PAYMENTS',
        Invoice = <any> 'INVOICE',
        Cash = <any> 'CASH',
        Accrual = <any> 'ACCRUAL',
        Flatratecash = <any> 'FLATRATECASH',
        Flatrateaccrual = <any> 'FLATRATEACCRUAL',
        Accruals = <any> 'ACCRUALS',
        Txca = <any> 'TXCA',
        Srcas = <any> 'SRCAS',
        Dsoutput = <any> 'DSOUTPUT',
        Blinput2 = <any> 'BLINPUT2',
        Epinput = <any> 'EPINPUT',
        Iminput2 = <any> 'IMINPUT2',
        Meinput = <any> 'MEINPUT',
        Igdsinput2 = <any> 'IGDSINPUT2',
        Esn33Output = <any> 'ESN33OUTPUT',
        Opinput = <any> 'OPINPUT',
        Osoutput = <any> 'OSOUTPUT',
        Txn33Input = <any> 'TXN33INPUT',
        Txessinput = <any> 'TXESSINPUT',
        Txreinput = <any> 'TXREINPUT',
        Txpetinput = <any> 'TXPETINPUT',
        Nrinput = <any> 'NRINPUT',
        Es33Output = <any> 'ES33OUTPUT',
        Zeroratedinput = <any> 'ZERORATEDINPUT',
        Zeroratedoutput = <any> 'ZERORATEDOUTPUT',
        Drchargesupply = <any> 'DRCHARGESUPPLY',
        Drcharge = <any> 'DRCHARGE',
        Capinput = <any> 'CAPINPUT',
        Capimports = <any> 'CAPIMPORTS',
        Iminput = <any> 'IMINPUT',
        Input2 = <any> 'INPUT2',
        Ciuinput = <any> 'CIUINPUT',
        Srinput = <any> 'SRINPUT',
        Output2 = <any> 'OUTPUT2',
        Sroutput = <any> 'SROUTPUT',
        Capoutput = <any> 'CAPOUTPUT',
        Sroutput2 = <any> 'SROUTPUT2',
        Ciuoutput = <any> 'CIUOUTPUT',
        Zroutput = <any> 'ZROUTPUT',
        Zrexport = <any> 'ZREXPORT',
        Acc28Plus = <any> 'ACC28PLUS',
        Accupto28 = <any> 'ACCUPTO28',
        Otheroutput = <any> 'OTHEROUTPUT',
        Shoutput = <any> 'SHOUTPUT',
        Zrinput = <any> 'ZRINPUT',
        Baddebt = <any> 'BADDEBT',
        Otherinput = <any> 'OTHERINPUT'
    }
}
