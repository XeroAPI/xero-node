"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExternalLink {
    static getAttributeTypeMap() {
        return ExternalLink.attributeTypeMap;
    }
}
exports.ExternalLink = ExternalLink;
ExternalLink.discriminator = undefined;
ExternalLink.attributeTypeMap = [
    {
        "name": "linkType",
        "baseName": "LinkType",
        "type": "ExternalLink.LinkTypeEnum"
    },
    {
        "name": "url",
        "baseName": "Url",
        "type": "string"
    },
    {
        "name": "description",
        "baseName": "Description",
        "type": "string"
    }
];
(function (ExternalLink) {
    let LinkTypeEnum;
    (function (LinkTypeEnum) {
        LinkTypeEnum[LinkTypeEnum["Facebook"] = 'Facebook'] = "Facebook";
        LinkTypeEnum[LinkTypeEnum["GooglePlus"] = 'GooglePlus'] = "GooglePlus";
        LinkTypeEnum[LinkTypeEnum["LinkedIn"] = 'LinkedIn'] = "LinkedIn";
        LinkTypeEnum[LinkTypeEnum["Twitter"] = 'Twitter'] = "Twitter";
        LinkTypeEnum[LinkTypeEnum["Website"] = 'Website'] = "Website";
    })(LinkTypeEnum = ExternalLink.LinkTypeEnum || (ExternalLink.LinkTypeEnum = {}));
})(ExternalLink = exports.ExternalLink || (exports.ExternalLink = {}));
//# sourceMappingURL=externalLink.js.map