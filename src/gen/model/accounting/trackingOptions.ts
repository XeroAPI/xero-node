import { TrackingOption } from '././trackingOption';

export class TrackingOptions {
    'options'?: Array<TrackingOption>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "options",
            "baseName": "Options",
            "type": "Array<TrackingOption>"
        }    ];

    static getAttributeTypeMap() {
        return TrackingOptions.attributeTypeMap;
    }
}

