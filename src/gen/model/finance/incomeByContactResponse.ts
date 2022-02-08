import { ContactDetail } from '././contactDetail';
import { ManualJournalTotal } from '././manualJournalTotal';
import { TotalDetail } from '././totalDetail';
import { TotalOther } from '././totalOther';

export class IncomeByContactResponse {
    /**
    * Start date of the report
    */
    'startDate'?: string;
    /**
    * End date of the report
    */
    'endDate'?: string;
    /**
    * Total value
    */
    'total'?: number;
    'totalDetail'?: TotalDetail;
    'totalOther'?: TotalOther;
    'contacts'?: Array<ContactDetail>;
    'manualJournals'?: ManualJournalTotal;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        },
        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "string"
        },
        {
            "name": "total",
            "baseName": "total",
            "type": "number"
        },
        {
            "name": "totalDetail",
            "baseName": "totalDetail",
            "type": "TotalDetail"
        },
        {
            "name": "totalOther",
            "baseName": "totalOther",
            "type": "TotalOther"
        },
        {
            "name": "contacts",
            "baseName": "contacts",
            "type": "Array<ContactDetail>"
        },
        {
            "name": "manualJournals",
            "baseName": "manualJournals",
            "type": "ManualJournalTotal"
        }    ];

    static getAttributeTypeMap() {
        return IncomeByContactResponse.attributeTypeMap;
    }
}

