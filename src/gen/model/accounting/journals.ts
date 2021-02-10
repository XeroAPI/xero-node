import { Journal } from '././journal';

export class Journals {
    'journals'?: Array<Journal>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "journals",
            "baseName": "Journals",
            "type": "Array<Journal>"
        }    ];

    static getAttributeTypeMap() {
        return Journals.attributeTypeMap;
    }
}

