"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrackingCategories {
    static getAttributeTypeMap() {
        return TrackingCategories.attributeTypeMap;
    }
}
exports.TrackingCategories = TrackingCategories;
TrackingCategories.discriminator = undefined;
TrackingCategories.attributeTypeMap = [
    {
        "name": "trackingCategories",
        "baseName": "TrackingCategories",
        "type": "Array<TrackingCategory>"
    }
];
//# sourceMappingURL=trackingCategories.js.map