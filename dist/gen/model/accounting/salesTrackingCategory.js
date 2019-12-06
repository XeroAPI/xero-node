"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SalesTrackingCategory {
    static getAttributeTypeMap() {
        return SalesTrackingCategory.attributeTypeMap;
    }
}
exports.SalesTrackingCategory = SalesTrackingCategory;
SalesTrackingCategory.discriminator = undefined;
SalesTrackingCategory.attributeTypeMap = [
    {
        "name": "trackingCategoryName",
        "baseName": "TrackingCategoryName",
        "type": "string"
    },
    {
        "name": "trackingOptionName",
        "baseName": "TrackingOptionName",
        "type": "string"
    }
];
//# sourceMappingURL=salesTrackingCategory.js.map