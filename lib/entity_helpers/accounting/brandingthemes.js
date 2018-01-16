const { clone } = require('lodash');
var EntityHelper = require('../entity_helper');
var BrandingTheme = require('../../entities/accounting/brandingtheme').BrandingTheme;
var util = require('util');

var BrandingThemes = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'BrandingThemes' }, options));
    },
    getBrandingThemes: function(options, callback) {
        var self = this;
        var clonedOptions = clone(options || {});
        clonedOptions.entityConstructor = function(data) { return new BrandingTheme(data) };
        return this.getEntities(clonedOptions)
    },
    getBrandingTheme: function(id) {
        return this.getBrandingThemes({ id: id })
            .then(function(brandingThemes) {
                return brandingThemes[0];
            });
    },
})

module.exports = BrandingThemes;