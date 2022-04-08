import { JournalLine } from '././journalLine';

export class Journal {
    /**
    * Xero identifier
    */
    'journalID'?: string;
    /**
    * Date the journal was posted
    */
    'journalDate'?: string;
    /**
    * Xero generated journal number
    */
    'journalNumber'?: number;
    /**
    * Created date UTC format
    */
    'createdDateUTC'?: Date;
    /**
    * reference field for additional indetifying information
    */
    'reference'?: string;
    /**
    * The identifier for the source transaction (e.g. InvoiceID)
    */
    'sourceID'?: string;
    /**
    * The journal source type. The type of transaction that created the journal
    */
    'sourceType'?: Journal.SourceTypeEnum;
    /**
    * See JournalLines
    */
    'journalLines'?: Array<JournalLine>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "journalID",
            "baseName": "JournalID",
            "type": "string"
        }        {
            "name": "journalDate",
            "baseName": "JournalDate",
            "type": "string"
        }        {
            "name": "journalNumber",
            "baseName": "JournalNumber",
            "type": "number"
        }        {
            "name": "createdDateUTC",
            "baseName": "CreatedDateUTC",
            "type": "Date"
        }        {
            "name": "reference",
            "baseName": "Reference",
            "type": "string"
        }        {
            "name": "sourceID",
            "baseName": "SourceID",
            "type": "string"
        }        {
            "name": "sourceType",
            "baseName": "SourceType",
            "type": "Journal.SourceTypeEnum"
        }        {
            "name": "journalLines",
            "baseName": "JournalLines",
            "type": "Array<JournalLine>"
        }    ];

    static getAttributeTypeMap() {
        return Journal.attributeTypeMap;
    }
}

export namespace Journal {
    export enum SourceTypeEnum {
        Accrec = <any> 'ACCREC',
        Accpay = <any> 'ACCPAY',
        Accreccredit = <any> 'ACCRECCREDIT',
        Accpaycredit = <any> 'ACCPAYCREDIT',
        Accrecpayment = <any> 'ACCRECPAYMENT',
        Accpaypayment = <any> 'ACCPAYPAYMENT',
        Arcreditpayment = <any> 'ARCREDITPAYMENT',
        Apcreditpayment = <any> 'APCREDITPAYMENT',
        Cashrec = <any> 'CASHREC',
        Cashpaid = <any> 'CASHPAID',
        Transfer = <any> 'TRANSFER',
        Arprepayment = <any> 'ARPREPAYMENT',
        Apprepayment = <any> 'APPREPAYMENT',
        Aroverpayment = <any> 'AROVERPAYMENT',
        Apoverpayment = <any> 'APOVERPAYMENT',
        Expclaim = <any> 'EXPCLAIM',
        Exppayment = <any> 'EXPPAYMENT',
        Manjournal = <any> 'MANJOURNAL',
        Payslip = <any> 'PAYSLIP',
        Wagepayable = <any> 'WAGEPAYABLE',
        Integratedpayrollpe = <any> 'INTEGRATEDPAYROLLPE',
        Integratedpayrollpt = <any> 'INTEGRATEDPAYROLLPT',
        Externalspendmoney = <any> 'EXTERNALSPENDMONEY',
        Integratedpayrollptpayment = <any> 'INTEGRATEDPAYROLLPTPAYMENT',
        Integratedpayrollcn = <any> 'INTEGRATEDPAYROLLCN'
    }
}
