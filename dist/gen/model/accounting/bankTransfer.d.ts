import { Account } from './account';
import { ValidationError } from './validationError';
export declare class BankTransfer {
    'fromBankAccount': Account;
    'toBankAccount': Account;
    'amount': string;
    'date'?: string;
    'bankTransferID'?: string;
    'currencyRate'?: number;
    'fromBankTransactionID'?: string;
    'toBankTransactionID'?: string;
    'hasAttachments'?: boolean;
    'createdDateUTC'?: Date;
    'validationErrors'?: Array<ValidationError>;
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
