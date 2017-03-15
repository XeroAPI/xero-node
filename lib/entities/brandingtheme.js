var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger')

var BrandingThemeSchema = new Entity.SchemaObject({
    BrandingThemeID: { type: String },
    Name: { type: String },
    SortOrder: { type: String },
    CreatedDateUTC: { type: String }
});

var BrandingTheme = Entity.extend(BrandingThemeSchema, {
    constructor: function(application, data, options) {
        logger.debug('BrandingTheme::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {}
});


module.exports = BrandingTheme;