import { ItemError } from '././itemError';

/**
* The outcome for a single request item.  Read `status` rather than inferring the outcome from the presence of `error`. On a termination an item can have both `SUCCESS` and an `error`, when the identifier did not match a connection to terminate.  Read `statusCode` per item as well, rather than deriving it from the envelope: it is the number the envelope itself is computed from. A `statusCode` of `204` is an idempotent no-op, not a failure; one of `500` on a `partial-failure-*` type is not a server fault to retry blindly. The item\'s `error` does not repeat the number as `status`. 
*/
export class BulkFeedConnectionResult {
    /**
    * On a create, Xero\'s identifier for the new Feed Connection; absent when the item was rejected, since nothing was created.  On a termination, the identifier supplied in the request, echoed back; absent only when the item did not include a usable identifier. 
    */
    'id'?: string;
    /**
    * The `accountToken` supplied in the request, echoed back, including on a rejected item. Not returned on a termination. 
    */
    'accountToken'?: string;
    /**
    * `SUCCESS` means the item reached the state the request asked for — on a create the connection exists, on a termination it is gone, including the idempotent case where it was already gone. `REJECTED` means nothing was written, or Xero confirmed that nothing took effect. A `4xx` item needs correcting before it is sent again, and a `500` item can be resent as it is. `error` says why. `PARTIAL_FAILURE` means the item did not complete, and the state it left behind needs attention or could not be confirmed. `error.subtype` says which, `error.detail` describes it, and the item needs attention that neither of the other two values implies.  A client deserialising this into a closed set of `SUCCESS` and `REJECTED` will fail on `PARTIAL_FAILURE`. That is intended rather than an oversight: binding it silently to either of the other two would hide state that the partner has to act on. 
    */
    'status'?: BulkFeedConnectionResult.StatusEnum;
    /**
    * The numeric status of this item: `201` on a created connection, `204` on a terminated or already-absent one, a 4xx on a rejection, `500` on a partial failure or on a rejection whose error is `internal-error` or `too-many-requests`. The response envelope is computed from the items\' `statusCode` values: all 2xx is `200`, all 4xx is `400`, anything else is `207`. So a partner can size up one item without reading `status` and `error` together. Never `202` and never `207`: those are envelope-only, and an item-level `207` would be numerically inside 2xx, so a batch of partial failures could be reported as `200`. 
    */
    'statusCode'?: number;
    'error'?: ItemError;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "accountToken",
            "baseName": "accountToken",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "BulkFeedConnectionResult.StatusEnum"
        },
        {
            "name": "statusCode",
            "baseName": "statusCode",
            "type": "number"
        },
        {
            "name": "error",
            "baseName": "error",
            "type": "ItemError"
        }    ];

    static getAttributeTypeMap() {
        return BulkFeedConnectionResult.attributeTypeMap;
    }
}

export namespace BulkFeedConnectionResult {
    export enum StatusEnum {
        SUCCESS = <any> 'SUCCESS',
        REJECTED = <any> 'REJECTED',
        PARTIALFAILURE = <any> 'PARTIAL_FAILURE'
    }
}
