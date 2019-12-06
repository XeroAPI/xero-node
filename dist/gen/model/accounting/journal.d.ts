import { JournalLine } from './journalLine';
export declare class Journal {
    'journalID'?: string;
    'journalDate'?: string;
    'journalNumber'?: string;
    'createdDateUTC'?: Date;
    'reference'?: string;
    'sourceID'?: string;
    'sourceType'?: Journal.SourceTypeEnum;
    'journalLines'?: Array<JournalLine>;
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
export declare namespace Journal {
    enum SourceTypeEnum {
        ACCREC,
        ACCPAY,
        ACCRECCREDIT,
        ACCPAYCREDIT,
        ACCRECPAYMENT,
        ACCPAYPAYMENT,
        ARCREDITPAYMENT,
        APCREDITPAYMENT,
        CASHREC,
        CASHPAID,
        TRANSFER,
        ARPREPAYMENT,
        APPREPAYMENT,
        AROVERPAYMENT,
        APOVERPAYMENT,
        EXPCLAIM,
        EXPPAYMENT,
        MANJOURNAL,
        PAYSLIP,
        WAGEPAYABLE,
        INTEGRATEDPAYROLLPE,
        INTEGRATEDPAYROLLPT,
        EXTERNALSPENDMONEY,
        INTEGRATEDPAYROLLPTPAYMENT,
        INTEGRATEDPAYROLLCN
    }
}
