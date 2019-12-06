"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PurchaseOrder {
    static getAttributeTypeMap() {
        return PurchaseOrder.attributeTypeMap;
    }
}
exports.PurchaseOrder = PurchaseOrder;
PurchaseOrder.discriminator = undefined;
PurchaseOrder.attributeTypeMap = [
    {
        "name": "contact",
        "baseName": "Contact",
        "type": "Contact"
    },
    {
        "name": "lineItems",
        "baseName": "LineItems",
        "type": "Array<LineItem>"
    },
    {
        "name": "date",
        "baseName": "Date",
        "type": "string"
    },
    {
        "name": "deliveryDate",
        "baseName": "DeliveryDate",
        "type": "string"
    },
    {
        "name": "lineAmountTypes",
        "baseName": "LineAmountTypes",
        "type": "LineAmountTypes"
    },
    {
        "name": "purchaseOrderNumber",
        "baseName": "PurchaseOrderNumber",
        "type": "string"
    },
    {
        "name": "reference",
        "baseName": "Reference",
        "type": "string"
    },
    {
        "name": "brandingThemeID",
        "baseName": "BrandingThemeID",
        "type": "string"
    },
    {
        "name": "currencyCode",
        "baseName": "CurrencyCode",
        "type": "CurrencyCode"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "PurchaseOrder.StatusEnum"
    },
    {
        "name": "sentToContact",
        "baseName": "SentToContact",
        "type": "boolean"
    },
    {
        "name": "deliveryAddress",
        "baseName": "DeliveryAddress",
        "type": "string"
    },
    {
        "name": "attentionTo",
        "baseName": "AttentionTo",
        "type": "string"
    },
    {
        "name": "telephone",
        "baseName": "Telephone",
        "type": "string"
    },
    {
        "name": "deliveryInstructions",
        "baseName": "DeliveryInstructions",
        "type": "string"
    },
    {
        "name": "expectedArrivalDate",
        "baseName": "ExpectedArrivalDate",
        "type": "string"
    },
    {
        "name": "purchaseOrderID",
        "baseName": "PurchaseOrderID",
        "type": "string"
    },
    {
        "name": "currencyRate",
        "baseName": "CurrencyRate",
        "type": "number"
    },
    {
        "name": "subTotal",
        "baseName": "SubTotal",
        "type": "number"
    },
    {
        "name": "totalTax",
        "baseName": "TotalTax",
        "type": "number"
    },
    {
        "name": "total",
        "baseName": "Total",
        "type": "number"
    },
    {
        "name": "totalDiscount",
        "baseName": "TotalDiscount",
        "type": "number"
    },
    {
        "name": "hasAttachments",
        "baseName": "HasAttachments",
        "type": "boolean"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "statusAttributeString",
        "baseName": "StatusAttributeString",
        "type": "string"
    },
    {
        "name": "validationErrors",
        "baseName": "ValidationErrors",
        "type": "Array<ValidationError>"
    },
    {
        "name": "warnings",
        "baseName": "Warnings",
        "type": "Array<ValidationError>"
    },
    {
        "name": "attachments",
        "baseName": "Attachments",
        "type": "Array<Attachment>"
    }
];
(function (PurchaseOrder) {
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["DRAFT"] = 'DRAFT'] = "DRAFT";
        StatusEnum[StatusEnum["SUBMITTED"] = 'SUBMITTED'] = "SUBMITTED";
        StatusEnum[StatusEnum["AUTHORISED"] = 'AUTHORISED'] = "AUTHORISED";
        StatusEnum[StatusEnum["BILLED"] = 'BILLED'] = "BILLED";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
    })(StatusEnum = PurchaseOrder.StatusEnum || (PurchaseOrder.StatusEnum = {}));
})(PurchaseOrder = exports.PurchaseOrder || (exports.PurchaseOrder = {}));
//# sourceMappingURL=purchaseOrder.js.map