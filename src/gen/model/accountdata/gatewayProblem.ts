
/**
* Error body produced by the Xero API gateway (authentication, authorisation and tenant checks). Note the PascalCase property names.
*/
export class GatewayProblem {
    'type'?: string;
    'title': string;
    'status': number;
    'detail'?: string;
    /**
    * The correlation ID of the request, also returned in the `Xero-Correlation-Id` header.
    */
    'instance'?: string;
    'extensions'?: { [key: string]: object; };

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "Type",
            "type": "string"
        },
        {
            "name": "title",
            "baseName": "Title",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "number"
        },
        {
            "name": "detail",
            "baseName": "Detail",
            "type": "string"
        },
        {
            "name": "instance",
            "baseName": "Instance",
            "type": "string"
        },
        {
            "name": "extensions",
            "baseName": "Extensions",
            "type": "{ [key: string]: object; }"
        }    ];

    static getAttributeTypeMap() {
        return GatewayProblem.attributeTypeMap;
    }
}

