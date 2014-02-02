var Entity = require('./entity')


module.exports.AddressSchema = new Entity.SchemaObject({
    AddressLine1: {type: String, toObject:'always'},
    AddressLine2: {type: String, toObject:'always'},
    City: {type: String, toObject:'always'},
    PostalCode: {type: String, toObject:'always'},
    Country: {type: String, toObject:'always'},
    AttentionTo: {type: String, toObject:'always'},
    AddressType: {type: String, toObject:'always'}
});

module.exports.PhoneSchema = new Entity.SchemaObject({
    PhoneNumber: {type: String, toObject:'always'},
    PhoneAreaCode: {type: String, toObject:'always'},
    PhoneType: {type: String, toObject:'always'}
});

module.exports.ExternalLinkSchema = new Entity.SchemaObject({
    LinkType: {type: String},
    Url: {type: String}
});

module.exports.ContactPerson = new Entity.SchemaObject({
    FirstName: {type: String},
    LastName: {type: String},
    EmailAddress: {type: String},
    IncludeInEmails: {type: Boolean}
});

module.exports.PaymentTermSchema = new Entity.SchemaObject({
    Day: {type: Number},
    Type: {type: String}
});
