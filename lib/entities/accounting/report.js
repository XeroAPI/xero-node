var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger');

var ReportSchema = new Entity.SchemaObject({
    ReportID: { type: String, toObject: 'always' },
    ReportName: { type: String, toObject: 'always' },
    ReportType: { type: String, toObject: 'always' },
    ReportTitles: { type: Array, arrayType: ReportTitleSchema, toObject: 'always' },
    ReportDate: { type: String, toObject: 'always' },
    UpdatedDateUTC: { type: String, toObject: 'always' },
    Rows: { type: Array, arrayType: ReportRowSchema, toObject: 'always' }
});

var ReportTitleSchema = new Entity.SchemaObject({
    ReportTitle: { type: String, toObject: 'always' }
});

var ReportRowSchema = new Entity.SchemaObject({
    RowType: { type: String, toObject: 'always' },
    Title: { type: String, toObject: 'always' },
    Cells: { type: Array, arrayType: ReportCellSchema, toObject: 'always' }
});

var ReportCellSchema = new Entity.SchemaObject({
    Value: { type: String, toObject: 'always' },
    Attributes: { type: Array, arrayType: ReportAttributeSchema, toObject: 'always' }
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
        Object.assign(self, _.omit(obj, 'Rows', 'Cells', 'ReportTitles'));

        if (obj.ReportTitles) {
            this.extractArray(obj.ReportTitles.ReportTitle, this.ReportTitles);
        }

        if (hasMoreRows(obj)) {
            //Loop through the rows to find the next level down
            obj.Rows.Row.forEach(function(level1Row) {

                if (hasMoreRows(level1Row)) {
                    var level2RowsArray = [];
                    level1Row.Rows.Row.forEach(function(level2row) {
                        level2row.Cells ? level2row.Cells = extractCells(level2row) : false;
                        level2RowsArray.push(level2row);
                    });
                    level1Row.Rows = level2RowsArray;
                }

                level1Row.Cells ? level1Row.Cells = extractCells(level1Row) : false;
                self.Rows.push(level1Row);
            });
        } else {
            //No more rows, but we should check for cells in this row
            if (obj.Rows && obj.Rows.Row && obj.Rows.Row.Cells && obj.Rows.Row.Cells.Cell && obj.Rows.Row.Cells.Cell.length > 0) {
                obj.Rows.Row.Cells = extractCells(obj.Rows.Row);
                self.Rows.push(obj.Rows.Row);
            }
        }

        return this;

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
module.exports.ReportSchema = ReportSchema;