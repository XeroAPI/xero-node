
/**
* Line amounts are exclusive of tax by default if you don’t specify this element. See Line Amount Types
*/
export enum QuoteLineAmountTypes {
    EXCLUSIVE = <any> 'EXCLUSIVE',
    INCLUSIVE = <any> 'INCLUSIVE',
    NOTAX = <any> 'NOTAX'
}
