import { Pagination } from '././pagination';
import { ProjectUser } from '././projectUser';

export class ProjectUsers {
    'pagination'?: Pagination;
    'items'?: Array<ProjectUser>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        }        {
            "name": "items",
            "baseName": "items",
            "type": "Array<ProjectUser>"
        }    ];

    static getAttributeTypeMap() {
        return ProjectUsers.attributeTypeMap;
    }
}

