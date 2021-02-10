import { CISOrgSetting } from '././cISOrgSetting';

export class CISOrgSettings {
    'cISSettings'?: Array<CISOrgSetting>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "cISSettings",
            "baseName": "CISSettings",
            "type": "Array<CISOrgSetting>"
        }    ];

    static getAttributeTypeMap() {
        return CISOrgSettings.attributeTypeMap;
    }
}

