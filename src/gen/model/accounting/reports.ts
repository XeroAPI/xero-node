import { Report } from '././report';

export class Reports {
    'reports'?: Array<Report>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "reports",
            "baseName": "Reports",
            "type": "Array<Report>"
        }    ];

    static getAttributeTypeMap() {
        return Reports.attributeTypeMap;
    }
}

