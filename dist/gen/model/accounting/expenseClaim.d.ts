import { Payment } from './payment';
import { Receipt } from './receipt';
import { User } from './user';
export declare class ExpenseClaim {
    'expenseClaimID'?: string;
    'status'?: ExpenseClaim.StatusEnum;
    'payments'?: Array<Payment>;
    'user'?: User;
    'receipts'?: Array<Receipt>;
    'updatedDateUTC'?: Date;
    'total'?: number;
    'amountDue'?: number;
    'amountPaid'?: number;
    'paymentDueDate'?: string;
    'reportingDate'?: string;
    'receiptID'?: string;
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
export declare namespace ExpenseClaim {
    enum StatusEnum {
        SUBMITTED,
        AUTHORISED,
        PAID,
        VOIDED,
        DELETED
    }
}
