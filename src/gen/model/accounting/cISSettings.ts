import { CISSetting } from '././cISSetting';

export class CISSettings {
    'cISSettings'?: Array<CISSetting>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "cISSettings",
            "baseName": "CISSettings",
            "type": "Array<CISSetting>"
        }    ];

    static getAttributeTypeMap() {
        return CISSettings.attributeTypeMap;
    }
}

