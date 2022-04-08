
export class AccountsReceivable {
    'outstanding'?: number;
    'overdue'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "outstanding",
            "baseName": "Outstanding",
            "type": "number"
        },
        {
            "name": "overdue",
            "baseName": "Overdue",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return AccountsReceivable.attributeTypeMap;
    }
}

