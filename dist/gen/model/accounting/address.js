"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    static getAttributeTypeMap() {
        return Address.attributeTypeMap;
    }
}
exports.Address = Address;
Address.discriminator = undefined;
Address.attributeTypeMap = [
    {
        "name": "addressType",
        "baseName": "AddressType",
        "type": "Address.AddressTypeEnum"
    },
    {
        "name": "addressLine1",
        "baseName": "AddressLine1",
        "type": "string"
    },
    {
        "name": "addressLine2",
        "baseName": "AddressLine2",
        "type": "string"
    },
    {
        "name": "addressLine3",
        "baseName": "AddressLine3",
        "type": "string"
    },
    {
        "name": "addressLine4",
        "baseName": "AddressLine4",
        "type": "string"
    },
    {
        "name": "city",
        "baseName": "City",
        "type": "string"
    },
    {
        "name": "region",
        "baseName": "Region",
        "type": "string"
    },
    {
        "name": "postalCode",
        "baseName": "PostalCode",
        "type": "string"
    },
    {
        "name": "country",
        "baseName": "Country",
        "type": "string"
    },
    {
        "name": "attentionTo",
        "baseName": "AttentionTo",
        "type": "string"
    }
];
(function (Address) {
    let AddressTypeEnum;
    (function (AddressTypeEnum) {
        AddressTypeEnum[AddressTypeEnum["POBOX"] = 'POBOX'] = "POBOX";
        AddressTypeEnum[AddressTypeEnum["STREET"] = 'STREET'] = "STREET";
        AddressTypeEnum[AddressTypeEnum["DELIVERY"] = 'DELIVERY'] = "DELIVERY";
    })(AddressTypeEnum = Address.AddressTypeEnum || (Address.AddressTypeEnum = {}));
})(Address = exports.Address || (exports.Address = {}));
//# sourceMappingURL=address.js.map