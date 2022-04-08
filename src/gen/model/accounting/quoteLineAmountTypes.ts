
/**
* Line amounts are exclusive of tax by default if you don’t specify this element. See Line Amount Types
*/
export enum QuoteLineAmountTypes {
    Exclusive = <any> 'EXCLUSIVE',
    Inclusive = <any> 'INCLUSIVE',
    Notax = <any> 'NOTAX'
}
