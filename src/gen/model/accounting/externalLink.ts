
export class ExternalLink {
    /**
    * See External link types
    */
    'linkType'?: ExternalLink.LinkTypeEnum;
    /**
    * URL for service e.g. http://twitter.com/xeroapi
    */
    'url'?: string;
    'description'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "linkType",
            "baseName": "LinkType",
            "type": "ExternalLink.LinkTypeEnum"
        }        {
            "name": "url",
            "baseName": "Url",
            "type": "string"
        }        {
            "name": "description",
            "baseName": "Description",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ExternalLink.attributeTypeMap;
    }
}

export namespace ExternalLink {
    export enum LinkTypeEnum {
        Facebook = <any> 'Facebook',
        GooglePlus = <any> 'GooglePlus',
        LinkedIn = <any> 'LinkedIn',
        Twitter = <any> 'Twitter',
        Website = <any> 'Website'
    }
}
