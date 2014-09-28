var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')
    , AddressSchema = require('./shared').AddressSchema
    , PhoneSchema = require('./shared').PhoneSchema
    , ContactPersonSchema = require('./shared').ContactPerson
    , PaymentTermSchema = require('./shared').PaymentTermSchema
    , dateformat = require('dateformat')

    
var TimesheetLineSchema = new Entity.schemaObject({
    EarningsTypeID: {type: String},
    TrackingItemID: {type: String},
    NumberOfUnits: {type: Array, arrayType: Number, toObject: 'always'},
});

var TimesheetSchema = new Entity.SchemaObject({
    EmployeeID: {type: String},
    StartDate: {type: Date},
    EndDate: {type: Date},
    TimesheetLines: {type: Array, arrayType: TimesheetLineSchema, toObject: 'always'},
    Status: {type: String},
    TimesheetID: {type: String},
    Hours: {type: Number}
});
   
var Timesheet = Entity.extend(TimesheetSchema, {
    constructor: function (application, data, options)
    {
        logger.debug('Timesheet::constructor');
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
        _.extend(self, _.omit(obj, 'TimesheetLines'));
        if (obj.TimesheetLines) {
            _.each(this.application.asArray(obj.TimesheetLines.TimesheetLine), function (timesheetLine)
            {
                self.TimesheetLines.push(timesheetLine);
            })
        }

        return this;
    },
    toXml: function ()
    {
        var timesheet = _.omit(this.toObject(), 'TimesheetLines');
        _.extend(timesheet, { TimesheetLines: []});
        _.forEach(this.TimesheetLines, function(timesheetline)
        {
            timesheet.TimesheetLines.push({ Address: timesheetline.toObject()})
        })

        return this.application.js2xml(timesheet, 'Timesheet');
    },
    /*getAttachments:function(options)
    {
        return this.application.core.attachments.getAttachments('Contacts/' + this.ContactID,options)
    },
    getAttachmentContent:function(fileName,options)
    {
        return this.application.core.attachments.getContent('Contacts/' + this.ContactID,fileName,options);
    },
    save:function(options)
    {
        var xml = '<Contacts>' + this.toXml() + '</Contacts>';
        var path, method;
        if (this.ContactID)
        {
            path = 'Contacts/' + this.ContactID;
            method = 'post'
        }
        else
        {
            path = 'Contacts';
            method = 'put'
        }
        return this.application.putOrPostEntity(method,  path,  xml)
    } */
});


module.exports = Timesheet;
module.exports.TimesheetSchema = TimesheetSchema;
