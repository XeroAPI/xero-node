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


        if (hasMoreRows(obj)) {
            logger.debug("Top Level");
            obj.Rows.Row.forEach(function(thisRow) {

                if (hasMoreRows(thisRow)) {
                    logger.debug("2nd Level");
                    thisRow.Rows.Row.forEach(function(anotherRow) {

                        if (hasMoreRows(anotherRow)) {
                            logger.debug("3rd Level");
                            anotherRow.Rows.Row.forEach(function(lastRow) {

                                if (hasMoreRows(lastRow)) {
                                    logger.debug("You're kidding");
                                }

                            });
                        }

                    });
                }

            });
        }


        if (obj.Rows) {
            obj.Rows.Row.forEach(function(row) {
                row.Cells ? row.Cells = extractCells(row) : false;
                self.Rows.push(row);
            });
        }

        return this;

        function extractRows(obj) {

        }

        function hasMoreRows(obj) {
            return obj.Rows && obj.Rows.Row && obj.Rows.Row.length >= 0;
        }

        function extractCells(row) {
            var cells = [];
            if (row.Cells) {
                row.Cells.Cell.forEach(function(cell) {
                    cells.push(cell);
                });
                row.Cells = cells;
            }
            return cells;
        }
    }
});

module.exports = Report;
module.exports.ItemSchema = ReportSchema;