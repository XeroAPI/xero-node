
export class TenNinetyNineContact {
    /**
    * Box 1 on 1099 Form
    */
    'box1'?: number;
    /**
    * Box 2 on 1099 Form
    */
    'box2'?: number;
    /**
    * Box 3 on 1099 Form
    */
    'box3'?: number;
    /**
    * Box 4 on 1099 Form
    */
    'box4'?: number;
    /**
    * Box 5 on 1099 Form
    */
    'box5'?: number;
    /**
    * Box 6 on 1099 Form
    */
    'box6'?: number;
    /**
    * Box 7 on 1099 Form
    */
    'box7'?: number;
    /**
    * Box 8 on 1099 Form
    */
    'box8'?: number;
    /**
    * Box 9 on 1099 Form
    */
    'box9'?: number;
    /**
    * Box 10 on 1099 Form
    */
    'box10'?: number;
    /**
    * Box 11 on 1099 Form
    */
    'box11'?: number;
    /**
    * Box 13 on 1099 Form
    */
    'box13'?: number;
    /**
    * Box 14 on 1099 Form
    */
    'box14'?: number;
    /**
    * Contact name on 1099 Form
    */
    'name'?: string;
    /**
    * Contact Fed Tax ID type
    */
    'federalTaxIDType'?: string;
    /**
    * Contact city on 1099 Form
    */
    'city'?: string;
    /**
    * Contact zip on 1099 Form
    */
    'zip'?: string;
    /**
    * Contact State on 1099 Form
    */
    'state'?: string;
    /**
    * Contact email on 1099 Form
    */
    'email'?: string;
    /**
    * Contact address on 1099 Form
    */
    'streetAddress'?: string;
    /**
    * Contact tax id on 1099 Form
    */
    'taxID'?: string;
    /**
    * Contact contact id
    */
    'contactId'?: string;
    /**
    * Contact legal name
    */
    'legalName'?: string;
    /**
    * Contact business name
    */
    'businessName'?: string;
    /**
    * Contact federal tax classification
    */
    'federalTaxClassification'?: TenNinetyNineContact.FederalTaxClassificationEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "box1",
            "baseName": "Box1",
            "type": "number"
        },
        {
            "name": "box2",
            "baseName": "Box2",
            "type": "number"
        },
        {
            "name": "box3",
            "baseName": "Box3",
            "type": "number"
        },
        {
            "name": "box4",
            "baseName": "Box4",
            "type": "number"
        },
        {
            "name": "box5",
            "baseName": "Box5",
            "type": "number"
        },
        {
            "name": "box6",
            "baseName": "Box6",
            "type": "number"
        },
        {
            "name": "box7",
            "baseName": "Box7",
            "type": "number"
        },
        {
            "name": "box8",
            "baseName": "Box8",
            "type": "number"
        },
        {
            "name": "box9",
            "baseName": "Box9",
            "type": "number"
        },
        {
            "name": "box10",
            "baseName": "Box10",
            "type": "number"
        },
        {
            "name": "box11",
            "baseName": "Box11",
            "type": "number"
        },
        {
            "name": "box13",
            "baseName": "Box13",
            "type": "number"
        },
        {
            "name": "box14",
            "baseName": "Box14",
            "type": "number"
        },
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        },
        {
            "name": "federalTaxIDType",
            "baseName": "FederalTaxIDType",
            "type": "string"
        },
        {
            "name": "city",
            "baseName": "City",
            "type": "string"
        },
        {
            "name": "zip",
            "baseName": "Zip",
            "type": "string"
        },
        {
            "name": "state",
            "baseName": "State",
            "type": "string"
        },
        {
            "name": "email",
            "baseName": "Email",
            "type": "string"
        },
        {
            "name": "streetAddress",
            "baseName": "StreetAddress",
            "type": "string"
        },
        {
            "name": "taxID",
            "baseName": "TaxID",
            "type": "string"
        },
        {
            "name": "contactId",
            "baseName": "ContactId",
            "type": "string"
        },
        {
            "name": "legalName",
            "baseName": "LegalName",
            "type": "string"
        },
        {
            "name": "businessName",
            "baseName": "BusinessName",
            "type": "string"
        },
        {
            "name": "federalTaxClassification",
            "baseName": "FederalTaxClassification",
            "type": "TenNinetyNineContact.FederalTaxClassificationEnum"
        }    ];

    static getAttributeTypeMap() {
        return TenNinetyNineContact.attributeTypeMap;
    }
}

export namespace TenNinetyNineContact {
    export enum FederalTaxClassificationEnum {
        SOLEPROPRIETOR = <any> 'SOLE_PROPRIETOR',
        PARTNERSHIP = <any> 'PARTNERSHIP',
        TRUSTORESTATE = <any> 'TRUST_OR_ESTATE',
        NONPROFIT = <any> 'NONPROFIT',
        CCORP = <any> 'C_CORP',
        SCORP = <any> 'S_CORP',
        OTHER = <any> 'OTHER'
    }
}
