
export class Phone {
    'phoneType'?: Phone.PhoneTypeEnum;
    /**
    * max length = 50
    */
    'phoneNumber'?: string;
    /**
    * max length = 10
    */
    'phoneAreaCode'?: string;
    /**
    * max length = 20
    */
    'phoneCountryCode'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
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
        }    ];

    static getAttributeTypeMap() {
        return Phone.attributeTypeMap;
    }
}

export namespace Phone {
    export enum PhoneTypeEnum {
        DEFAULT = <any> 'DEFAULT',
        DDI = <any> 'DDI',
        MOBILE = <any> 'MOBILE',
        FAX = <any> 'FAX',
        OFFICE = <any> 'OFFICE'
    }
}
