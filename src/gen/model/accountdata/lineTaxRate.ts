
/**
* The tax rate applied to this transaction line. Always present; its fields are null when no tax rate applies.
*/
export class LineTaxRate {
    'code'?: string;
    'name'?: string;
    'percentage'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "code",
            "baseName": "code",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "percentage",
            "baseName": "percentage",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return LineTaxRate.attributeTypeMap;
    }
}

