import { BrandingTheme } from '././brandingTheme';

export class BrandingThemes {
    'brandingThemes'?: Array<BrandingTheme>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "brandingThemes",
            "baseName": "BrandingThemes",
            "type": "Array<BrandingTheme>"
        }    ];

    static getAttributeTypeMap() {
        return BrandingThemes.attributeTypeMap;
    }
}

