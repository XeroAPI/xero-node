import { ReportAttribute } from '././reportAttribute';

export class ReportCell {
    'value'?: string;
    'attributes'?: Array<ReportAttribute>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "value",
            "baseName": "Value",
            "type": "string"
        },
        {
            "name": "attributes",
            "baseName": "Attributes",
            "type": "Array<ReportAttribute>"
        }    ];

    static getAttributeTypeMap() {
        return ReportCell.attributeTypeMap;
    }
}

