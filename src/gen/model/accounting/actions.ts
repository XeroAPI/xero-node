import { Action } from '././action';

export class Actions {
    'actions'?: Array<Action>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "actions",
            "baseName": "Actions",
            "type": "Array<Action>"
        }    ];

    static getAttributeTypeMap() {
        return Actions.attributeTypeMap;
    }
}

