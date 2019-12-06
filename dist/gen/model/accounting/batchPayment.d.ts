import { Account } from './account';
import { Payment } from './payment';
export declare class BatchPayment {
    'account'?: Account;
    'reference'?: string;
    'particulars'?: string;
    'code'?: string;
    'details'?: string;
    'narrative'?: string;
    'batchPaymentID'?: string;
    'dateString'?: string;
    'date'?: string;
    'amount'?: number;
    'payments'?: Array<Payment>;
    'type'?: BatchPayment.TypeEnum;
    'status'?: string;
    'totalAmount'?: string;
    'updatedDateUTC'?: Date;
    'isReconciled'?: string;
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
export declare namespace BatchPayment {
    enum TypeEnum {
        PAYBATCH,
        RECBATCH
    }
}
