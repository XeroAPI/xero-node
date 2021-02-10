import { ReportWithRow } from '././reportWithRow';

export class ReportWithRows {
    'reports'?: Array<ReportWithRow>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "reports",
            "baseName": "Reports",
            "type": "Array<ReportWithRow>"
        }    ];

    static getAttributeTypeMap() {
        return ReportWithRows.attributeTypeMap;
    }
}

