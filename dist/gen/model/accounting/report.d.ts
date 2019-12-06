import { TenNinteyNineContact } from './tenNinteyNineContact';
export declare class Report {
    'reportID'?: string;
    'reportName'?: string;
    'reportType'?: Report.ReportTypeEnum;
    'reportTitle'?: string;
    'reportDate'?: string;
    'updatedDateUTC'?: Date;
    'contacts'?: Array<TenNinteyNineContact>;
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
export declare namespace Report {
    enum ReportTypeEnum {
        AgedPayablesByContact
    }
}
