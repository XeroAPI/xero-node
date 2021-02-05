
/**
* The Object Group that the object is in. These roughly correlate to the endpoints that can be used to retrieve the object via the core accounting API.
*/
export enum ObjectGroup {
    Account = <any> 'Account',
    BankTransaction = <any> 'BankTransaction',
    Contact = <any> 'Contact',
    CreditNote = <any> 'CreditNote',
    Invoice = <any> 'Invoice',
    Item = <any> 'Item',
    ManualJournal = <any> 'ManualJournal',
    Overpayment = <any> 'Overpayment',
    Payment = <any> 'Payment',
    Prepayment = <any> 'Prepayment',
    Receipt = <any> 'Receipt'
}
