
export class PracticeResponse {
    /**
    * Year of becoming a partner.
    */
    'xeroPartnerSince'?: number;
    /**
    * Customer tier e.g. Silver
    */
    'tier'?: string;
    /**
    * Country of location.
    */
    'location'?: string;
    /**
    * Organisation count.
    */
    'organisationCount'?: number;
    /**
    * Staff certified (true/false).
    */
    'staffCertified'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "xeroPartnerSince",
            "baseName": "xeroPartnerSince",
            "type": "number"
        }        {
            "name": "tier",
            "baseName": "tier",
            "type": "string"
        }        {
            "name": "location",
            "baseName": "location",
            "type": "string"
        }        {
            "name": "organisationCount",
            "baseName": "organisationCount",
            "type": "number"
        }        {
            "name": "staffCertified",
            "baseName": "staffCertified",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return PracticeResponse.attributeTypeMap;
    }
}

