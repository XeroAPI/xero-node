"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LineItemTracking {
    static getAttributeTypeMap() {
        return LineItemTracking.attributeTypeMap;
    }
}
exports.LineItemTracking = LineItemTracking;
LineItemTracking.discriminator = undefined;
LineItemTracking.attributeTypeMap = [
    {
        "name": "trackingCategoryID",
        "baseName": "TrackingCategoryID",
        "type": "string"
    },
    {
        "name": "name",
        "baseName": "Name",
        "type": "string"
    },
    {
        "name": "option",
        "baseName": "Option",
        "type": "string"
    }
];
//# sourceMappingURL=lineItemTracking.js.map