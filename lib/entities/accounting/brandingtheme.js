var _ = require('lodash'),
    Entity = require('../entity')

var BrandingThemeSchema = Entity.SchemaObject({
    BrandingThemeID: { type: String },
    Name: { type: String },
    SortOrder: { type: String },
    CreatedDateUTC: { type: Date }
});

var BrandingTheme = Entity.extend(BrandingThemeSchema, {
    constructor: function(application, data, options) {
        
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {}
});


module.exports.BrandingTheme = BrandingTheme;