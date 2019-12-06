"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrackingCategory {
    static getAttributeTypeMap() {
        return TrackingCategory.attributeTypeMap;
    }
}
exports.TrackingCategory = TrackingCategory;
TrackingCategory.discriminator = undefined;
TrackingCategory.attributeTypeMap = [
    {
        "name": "trackingCategoryID",
        "baseName": "TrackingCategoryID",
        "type": "string"
    },
    {
        "name": "trackingOptionID",
        "baseName": "TrackingOptionID",
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
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "TrackingCategory.StatusEnum"
    },
    {
        "name": "options",
        "baseName": "Options",
        "type": "Array<TrackingOption>"
    }
];
(function (TrackingCategory) {
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        StatusEnum[StatusEnum["ARCHIVED"] = 'ARCHIVED'] = "ARCHIVED";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
    })(StatusEnum = TrackingCategory.StatusEnum || (TrackingCategory.StatusEnum = {}));
})(TrackingCategory = exports.TrackingCategory || (exports.TrackingCategory = {}));
//# sourceMappingURL=trackingCategory.js.map