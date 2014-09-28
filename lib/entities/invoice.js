var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')
    , ContactSchema = require('./contact').ContactSchema
    , Contact = require('./contact')

var InvoiceIDSchema = Entity.schemaObject({
    InvoiceID: {type: String},
    InvoiceNumber: {type: String}
});

var CreditNoteIDSchema = Entity.schemaObject({
    CreditNoteID: {type: String},
    CreditNoteNumber: {type: String}
});

var AccountIDorCodeSchema = Entity.schemaObject({
    AccountID: {type: String},
    Code: {type: String}
});

var PaymentSchema = new Entity.SchemaObject({
    Invoice: {type: InvoiceIDSchema},
    CreditNote: {type: CreditNoteIDSchema},
    Account: {type: AccountIDorCodeSchema},
    Date: {type: Date},
    CurrencyRate: {type: Number},
    Amount: {type: Number},
    Reference: {type: String},
    IsReconciled: {type: Boolean},
    Status: {type: String},
    PaymentType: {type: String},
    UpdatedDateUTC: {type: Date}
     
});

var InvoiceSchema = new Entity.SchemaObject({
    Type: {type: Type},
    Contact: {type: ContactSchema},
    LineItems: {type: Array, arrayType: LineItemSchema, toObject: 'always'},
    Date: {type:Date},
    DueDate: {type:Date},
    LineAmountTypes: {type: String},
    InvoiceNumber: {type: String},
    Reference: {type: String},
    BrandingThemeID: {type: String},
    URL: {type: String},
    CurrencyCode: {type: String},
    CurrencyRate: {type: Number},
    Status: {type: String},
    SentToContact: {type: Boolean},
    ExpectedPaymentDate: {type: Date},
    PlannedPaymentDate: {type: Date},
    SubTotal: {type: Number},
    TotalTax: {type: Number},
    Total: {type: Number},
    InvoiceID: {type: String},
    HasAttachments: {type: Boolean},
    Payments: {type: Array, arrayType: PaymentSchema, toObject: 'always'},
    AmountDue: {type: Number},
    AmountPaid: {type: Number},
    FullyPaidOnDate: {type: Date},
    AmountCredited: {type: Number},
    UpdatedDateUTC: {type: Date},
    //CreditNotes: {type: Array, arrayType: CreditNoteSchema, toObject: 'always'},
});

var Invoice = Entity.extend(InvoiceSchema, {
    constructor: function (application, data, options)
    {
        logger.debug('Invoice::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function (data, options)
    {
    },
    changes: function (options)
    {
        return this._super(options);
    },
    _toObject: function (options)
    {
        return this._super(options);
    },
    fromXmlObj: function (obj)
    {
        var self = this;
        _.extend(self, _.omit(obj, 'LineItems', 'Payments'));
        if (obj.LineItems) {
            var lineItems = this.application.asArray(obj.LineItems.LineItem);
            _.each(lineItems, function (lineItem)
            {
                self.LineItems.push(lineItem);
            })
        }

        if (obj.Payments) {
            var payments = this.application.asArray(obj.Payments.Payment);
            _.each(payments, function (payment)
            {
                self.Addresses.push(payment);
            })
        }

        return this;
    },
    toXml: function ()
    {

    }
});


module.exports = Invoice;
module.exports.InvoiceSchema = InvoiceSchema;
