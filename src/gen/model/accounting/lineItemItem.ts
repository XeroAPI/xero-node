
export class LineItemItem {
    /**
    * User defined item code (max length = 30)
    */
    'code'?: string;
    /**
    * The name of the item (max length = 50)
    */
    'name'?: string;
    /**
    * The Xero identifier for an Item
    */
    'itemID'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "code",
            "baseName": "Code",
            "type": "string"
        }        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        }        {
            "name": "itemID",
            "baseName": "ItemID",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return LineItemItem.attributeTypeMap;
    }
}

