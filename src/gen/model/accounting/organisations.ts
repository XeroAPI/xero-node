import { Organisation } from '././organisation';

export class Organisations {
    'organisations'?: Array<Organisation>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "organisations",
            "baseName": "Organisations",
            "type": "Array<Organisation>"
        }    ];

    static getAttributeTypeMap() {
        return Organisations.attributeTypeMap;
    }
}

