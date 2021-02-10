import { Settings } from '././settings';

export class SettingsObject {
    'settings'?: Settings;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "settings",
            "baseName": "Settings",
            "type": "Settings"
        }    ];

    static getAttributeTypeMap() {
        return SettingsObject.attributeTypeMap;
    }
}

