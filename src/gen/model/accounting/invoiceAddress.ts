
export class InvoiceAddress {
    /**
    * Indicates whether the address is defined as origin (FROM) or destination (TO)
    */
    'invoiceAddressType'?: InvoiceAddress.InvoiceAddressTypeEnum;
    /**
    * First line of a physical address
    */
    'addressLine1'?: string;
    /**
    * Second line of a physical address
    */
    'addressLine2'?: string;
    /**
    * Third line of a physical address
    */
    'addressLine3'?: string;
    /**
    * Fourth line of a physical address
    */
    'addressLine4'?: string;
    /**
    * City of a physical address
    */
    'city'?: string;
    /**
    * Region or state of a physical address
    */
    'region'?: string;
    /**
    * Postal code of a physical address
    */
    'postalCode'?: string;
    /**
    * Country of a physical address
    */
    'country'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "invoiceAddressType",
            "baseName": "InvoiceAddressType",
            "type": "InvoiceAddress.InvoiceAddressTypeEnum"
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
        }    ];

    static getAttributeTypeMap() {
        return InvoiceAddress.attributeTypeMap;
    }
}

export namespace InvoiceAddress {
    export enum InvoiceAddressTypeEnum {
        FROM = <any> 'FROM',
        TO = <any> 'TO'
    }
}
