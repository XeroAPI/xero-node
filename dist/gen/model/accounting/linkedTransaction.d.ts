import { ValidationError } from './validationError';
export declare class LinkedTransaction {
    'sourceTransactionID'?: string;
    'sourceLineItemID': string;
    'contactID'?: string;
    'targetTransactionID'?: string;
    'targetLineItemID'?: string;
    'linkedTransactionID'?: string;
    'status'?: LinkedTransaction.StatusEnum;
    'type'?: LinkedTransaction.TypeEnum;
    'updatedDateUTC'?: Date;
    'sourceTransactionTypeCode'?: LinkedTransaction.SourceTransactionTypeCodeEnum;
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
export declare namespace LinkedTransaction {
    enum StatusEnum {
        APPROVED,
        DRAFT,
        ONDRAFT,
        BILLED,
        VOIDED
    }
    enum TypeEnum {
        BILLABLEEXPENSE
    }
    enum SourceTransactionTypeCodeEnum {
        ACCPAY,
        SPEND
    }
}
