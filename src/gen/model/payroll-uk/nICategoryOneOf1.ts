
export class NICategoryOneOf1 {
    'niCategory'?: NICategoryOneOf1.NiCategoryEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "niCategory",
            "baseName": "niCategory",
            "type": "NICategoryOneOf1.NiCategoryEnum"
        }    ];

    static getAttributeTypeMap() {
        return NICategoryOneOf1.attributeTypeMap;
    }
}

export namespace NICategoryOneOf1 {
    export enum NiCategoryEnum {
        V = <any> 'V'
    }
}
