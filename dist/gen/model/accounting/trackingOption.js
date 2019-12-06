"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrackingOption {
    static getAttributeTypeMap() {
        return TrackingOption.attributeTypeMap;
    }
}
exports.TrackingOption = TrackingOption;
TrackingOption.discriminator = undefined;
TrackingOption.attributeTypeMap = [
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
        "name": "status",
        "baseName": "Status",
        "type": "TrackingOption.StatusEnum"
    },
    {
        "name": "trackingCategoryID",
        "baseName": "TrackingCategoryID",
        "type": "string"
    }
];
(function (TrackingOption) {
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        StatusEnum[StatusEnum["ARCHIVED"] = 'ARCHIVED'] = "ARCHIVED";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
    })(StatusEnum = TrackingOption.StatusEnum || (TrackingOption.StatusEnum = {}));
})(TrackingOption = exports.TrackingOption || (exports.TrackingOption = {}));
//# sourceMappingURL=trackingOption.js.map