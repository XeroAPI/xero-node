
export class TaxBreakdownComponent {
    /**
    * The unique ID number of this component
    */
    'taxComponentId'?: string;
    /**
    * The type of the jurisdiction
    */
    'type'?: TaxBreakdownComponent.TypeEnum;
    /**
    * The name of the jurisdiction
    */
    'name'?: string;
    /**
    * The percentage of the tax
    */
    'taxPercentage'?: number;
    /**
    * The amount of the tax
    */
    'taxAmount'?: number;
    /**
    * The amount that is taxable
    */
    'taxableAmount'?: number;
    /**
    * The amount that is not taxable
    */
    'nonTaxableAmount'?: number;
    /**
    * The amount that is exempt
    */
    'exemptAmount'?: number;
    /**
    * The state assigned number of the jurisdiction
    */
    'stateAssignedNo'?: string;
    /**
    * Name identifying the region within the country
    */
    'jurisdictionRegion'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "taxComponentId",
            "baseName": "TaxComponentId",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "Type",
            "type": "TaxBreakdownComponent.TypeEnum"
        },
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        },
        {
            "name": "taxPercentage",
            "baseName": "TaxPercentage",
            "type": "number"
        },
        {
            "name": "taxAmount",
            "baseName": "TaxAmount",
            "type": "number"
        },
        {
            "name": "taxableAmount",
            "baseName": "TaxableAmount",
            "type": "number"
        },
        {
            "name": "nonTaxableAmount",
            "baseName": "NonTaxableAmount",
            "type": "number"
        },
        {
            "name": "exemptAmount",
            "baseName": "ExemptAmount",
            "type": "number"
        },
        {
            "name": "stateAssignedNo",
            "baseName": "StateAssignedNo",
            "type": "string"
        },
        {
            "name": "jurisdictionRegion",
            "baseName": "JurisdictionRegion",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return TaxBreakdownComponent.attributeTypeMap;
    }
}

export namespace TaxBreakdownComponent {
    export enum TypeEnum {
        USCOUNTRY = <any> 'SYSGST/USCOUNTRY',
        USSTATE = <any> 'SYSGST/USSTATE',
        USCOUNTY = <any> 'SYSGST/USCOUNTY',
        USCITY = <any> 'SYSGST/USCITY',
        USSPECIAL = <any> 'SYSGST/USSPECIAL'
    }
}
