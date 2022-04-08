import { Accounts } from '././accounts';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class Settings {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'settings'?: Accounts;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        }        {
            "name": "problem",
            "baseName": "problem",
            "type": "Problem"
        }        {
            "name": "settings",
            "baseName": "settings",
            "type": "Accounts"
        }    ];

    static getAttributeTypeMap() {
        return Settings.attributeTypeMap;
    }
}

