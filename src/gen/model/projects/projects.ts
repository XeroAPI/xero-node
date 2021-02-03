import { Pagination } from '././pagination';
import { Project } from '././project';

export class Projects {
    'pagination'?: Pagination;
    'items'?: Array<Project>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "items",
            "baseName": "items",
            "type": "Array<Project>"
        }    ];

    static getAttributeTypeMap() {
        return Projects.attributeTypeMap;
    }
}

