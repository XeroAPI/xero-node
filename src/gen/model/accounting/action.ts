
export class Action {
    /**
    * Name of the actions for this organisation
    */
    'name'?: string;
    /**
    * Status of the action for this organisation
    */
    'status'?: Action.StatusEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        }        {
            "name": "status",
            "baseName": "Status",
            "type": "Action.StatusEnum"
        }    ];

    static getAttributeTypeMap() {
        return Action.attributeTypeMap;
    }
}

export namespace Action {
    export enum StatusEnum {
        Allowed = <any> 'ALLOWED',
        NotAllowed = <any> 'NOT-ALLOWED'
    }
}
