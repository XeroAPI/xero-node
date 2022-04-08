
export class CISSetting {
    /**
    * Boolean that describes if the contact is a CIS Subcontractor
    */
    'cISEnabled'?: boolean;
    /**
    * CIS Deduction rate for the contact if he is a subcontractor. If the contact is not CISEnabled, then the rate is not returned
    */
    'rate'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "cISEnabled",
            "baseName": "CISEnabled",
            "type": "boolean"
        }        {
            "name": "rate",
            "baseName": "Rate",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return CISSetting.attributeTypeMap;
    }
}

