"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Phone {
    static getAttributeTypeMap() {
        return Phone.attributeTypeMap;
    }
}
exports.Phone = Phone;
Phone.discriminator = undefined;
Phone.attributeTypeMap = [
    {
        "name": "phoneType",
        "baseName": "PhoneType",
        "type": "Phone.PhoneTypeEnum"
    },
    {
        "name": "phoneNumber",
        "baseName": "PhoneNumber",
        "type": "string"
    },
    {
        "name": "phoneAreaCode",
        "baseName": "PhoneAreaCode",
        "type": "string"
    },
    {
        "name": "phoneCountryCode",
        "baseName": "PhoneCountryCode",
        "type": "string"
    }
];
(function (Phone) {
    let PhoneTypeEnum;
    (function (PhoneTypeEnum) {
        PhoneTypeEnum[PhoneTypeEnum["DEFAULT"] = 'DEFAULT'] = "DEFAULT";
        PhoneTypeEnum[PhoneTypeEnum["DDI"] = 'DDI'] = "DDI";
        PhoneTypeEnum[PhoneTypeEnum["MOBILE"] = 'MOBILE'] = "MOBILE";
        PhoneTypeEnum[PhoneTypeEnum["FAX"] = 'FAX'] = "FAX";
        PhoneTypeEnum[PhoneTypeEnum["OFFICE"] = 'OFFICE'] = "OFFICE";
    })(PhoneTypeEnum = Phone.PhoneTypeEnum || (Phone.PhoneTypeEnum = {}));
})(Phone = exports.Phone || (exports.Phone = {}));
//# sourceMappingURL=phone.js.map