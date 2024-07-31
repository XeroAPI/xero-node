import { Journal } from '././journal';
import { ValidationError } from '././validationError';

export class Journals {
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    'journals'?: Array<Journal>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "warnings",
            "baseName": "Warnings",
            "type": "Array<ValidationError>"
        },
        {
            "name": "journals",
            "baseName": "Journals",
            "type": "Array<Journal>"
        }    ];

    static getAttributeTypeMap() {
        return Journals.attributeTypeMap;
    }
}

