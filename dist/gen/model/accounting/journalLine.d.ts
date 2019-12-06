import { AccountType } from './accountType';
import { TrackingCategory } from './trackingCategory';
export declare class JournalLine {
    'journalLineID'?: string;
    'accountID'?: string;
    'accountCode'?: string;
    'accountType'?: AccountType;
    'accountName'?: string;
    'description'?: string;
    'netAmount'?: number;
    'grossAmount'?: number;
    'taxAmount'?: number;
    'taxType'?: string;
    'taxName'?: string;
    'trackingCategories'?: Array<TrackingCategory>;
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
