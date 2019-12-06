"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BrandingTheme {
    static getAttributeTypeMap() {
        return BrandingTheme.attributeTypeMap;
    }
}
exports.BrandingTheme = BrandingTheme;
BrandingTheme.discriminator = undefined;
BrandingTheme.attributeTypeMap = [
    {
        "name": "brandingThemeID",
        "baseName": "BrandingThemeID",
        "type": "string"
    },
    {
        "name": "name",
        "baseName": "Name",
        "type": "string"
    },
    {
        "name": "logoUrl",
        "baseName": "LogoUrl",
        "type": "string"
    },
    {
        "name": "type",
        "baseName": "Type",
        "type": "BrandingTheme.TypeEnum"
    },
    {
        "name": "sortOrder",
        "baseName": "SortOrder",
        "type": "number"
    },
    {
        "name": "createdDateUTC",
        "baseName": "CreatedDateUTC",
        "type": "Date"
    }
];
(function (BrandingTheme) {
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["INVOICE"] = 'INVOICE'] = "INVOICE";
    })(TypeEnum = BrandingTheme.TypeEnum || (BrandingTheme.TypeEnum = {}));
})(BrandingTheme = exports.BrandingTheme || (exports.BrandingTheme = {}));
//# sourceMappingURL=brandingTheme.js.map