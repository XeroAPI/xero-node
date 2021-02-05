import { ProjectStatus } from '././projectStatus';

export class ProjectPatch {
    'status': ProjectStatus;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "status",
            "baseName": "status",
            "type": "ProjectStatus"
        }    ];

    static getAttributeTypeMap() {
        return ProjectPatch.attributeTypeMap;
    }
}

