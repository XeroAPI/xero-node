var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger');

var ReportSchema = new Entity.SchemaObject({
    ReportID: { type: String, toObject: 'always' },
    ReportName: { type: String, toObject: 'always' },
    ReportType: { type: String, toObject: 'always' },
    ReportTitles: [ReportTitleSchema],
    ReportDate: { type: String, toObject: 'always' },
    UpdatedDateUTC: { type: String, toObject: 'always' },
    Rows: [ReportRowSchema]
});

var ReportTitleSchema = new Entity.SchemaObject({
    ReportTitle: { type: String, toObject: 'always' }
});

var ReportRowSchema = new Entity.SchemaObject({
    RowType: { type: String, toObject: 'always' },
    Title: { type: String, toObject: 'always' },
    Cells: [ReportCellSchema]
});

var ReportCellSchema = new Entity.SchemaObject({
    Value: { type: String, toObject: 'always' },
    Attributes: [ReportAttributeSchema]
});

var ReportAttributeSchema = new Entity.SchemaObject({
    Value: { type: String, toObject: 'always' },
    Id: { type: String, toObject: 'always' }
});

var Report = Entity.extend(ReportSchema, {
    constructor: function(application, data, options) {
        logger.debug('Report::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    fromXmlObj: function(obj) {
        var self = this;
        Object.assign(self, _.omit(obj, 'Rows', 'Cells'));
        if (obj.Rows) {
            _.each(obj.Rows.Row, function(row) {
                _.each(row.Cells.Cell, function(cell) {
                    console.log(cell);
                });
                self.Rows.push(row);
            });
        }

        return this;
    }
});

module.exports = Report;
module.exports.ItemSchema = ReportSchema;