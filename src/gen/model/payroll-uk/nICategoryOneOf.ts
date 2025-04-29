
export class NICategoryOneOf {
    'niCategory'?: NICategoryOneOf.NiCategoryEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "niCategory",
            "baseName": "niCategory",
            "type": "NICategoryOneOf.NiCategoryEnum"
        }    ];

    static getAttributeTypeMap() {
        return NICategoryOneOf.attributeTypeMap;
    }
}

export namespace NICategoryOneOf {
    export enum NiCategoryEnum {
        F = <any> 'F',
        I = <any> 'I',
        L = <any> 'L',
        S = <any> 'S',
        N = <any> 'N',
        E = <any> 'E',
        D = <any> 'D',
        K = <any> 'K'
    }
}
