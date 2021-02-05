
/**
* Line amounts are exclusive of tax by default if you don’t specify this element. See Line Amount Types
*/
export enum LineAmountTypes {
    Exclusive = <any> 'Exclusive',
    Inclusive = <any> 'Inclusive',
    NoTax = <any> 'NoTax'
}
