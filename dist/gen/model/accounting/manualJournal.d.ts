import { Attachment } from './attachment';
import { LineAmountTypes } from './lineAmountTypes';
import { ManualJournalLine } from './manualJournalLine';
import { ValidationError } from './validationError';
export declare class ManualJournal {
    'narration': string;
    'journalLines': Array<ManualJournalLine>;
    'date'?: string;
    'lineAmountTypes'?: LineAmountTypes;
    'status'?: ManualJournal.StatusEnum;
    'url'?: string;
    'showOnCashBasisReports'?: boolean;
    'hasAttachments'?: boolean;
    'updatedDateUTC'?: Date;
    'manualJournalID'?: string;
    'warnings'?: Array<ValidationError>;
    'validationErrors'?: Array<ValidationError>;
    'attachments'?: Array<Attachment>;
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
export declare namespace ManualJournal {
    enum StatusEnum {
        DRAFT,
        POSTED,
        DELETED,
        VOIDED
    }
}
