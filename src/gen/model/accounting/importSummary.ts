import { ImportSummaryAccounts } from '././importSummaryAccounts';
import { ImportSummaryOrganisation } from '././importSummaryOrganisation';

/**
* A summary of the import from setup endpoint
*/
export class ImportSummary {
    'accounts'?: ImportSummaryAccounts;
    'organisation'?: ImportSummaryOrganisation;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accounts",
            "baseName": "Accounts",
            "type": "ImportSummaryAccounts"
        },
        {
            "name": "organisation",
            "baseName": "Organisation",
            "type": "ImportSummaryOrganisation"
        }    ];

    static getAttributeTypeMap() {
        return ImportSummary.attributeTypeMap;
    }
}

