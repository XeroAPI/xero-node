var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger')

var EarningTypeSchema = new Entity.SchemaObject({
    EarningsType: { type: String },
    ExpenseAccountCode: { type: String },
    EarningsCategory: { type: String },
    RateType: { type: String },
    TypeOfUnits: { type: String },
    EarningRateID: { type: String },
    Multiple: { type: Number },
    DoNotAccrueTimeOff: { type: Boolean },
    IsSupplemental: { type: Boolean },
    Amount: { type: Number }
});

var BenefitTypeSchema = new Entity.SchemaObject({
    BenefitType: { type: String },
    BenefitCategory: { type: String },
    LiabilityAccountCode: { type: String },
    ExpenseAccountCode: { type: String },
    BenefitTypeID: { type: String },
    StandardAmount: { type: Number },
    CompanyMax: { type: Number },
    Percentage: { type: Number },
    ShowBalanceOnPaystub: { type: Boolean }
});

var DeductionTypeSchema = new Entity.SchemaObject({
    DeductionType: { type: String },
    DeductionCategory: { type: String },
    CalculationType: { type: String },
    LiabilityAccountCode: { type: String },
    DeductionTypeID: { type: String },
    StandardAmount: { type: Number },
    CompanyMax: { type: Number }
});

var ReimbursementTypeSchema = new Entity.SchemaObject({
    DeductionType: { type: String },
    ExpenseOfLiabilityAccountCode: { type: String },
    ReimbursementTypeID: { type: String }
});

var TimeOffTypeSchema = new Entity.SchemaObject({
    TimeOffType: { type: String },
    TimeOffCategory: { type: String },
    LiabilityAccountCode: { type: String },
    ExpenseAccountCode: { type: String },
    TimeOffTypeID: { type: String },
    ShowBalanceToEmployee: { type: Boolean }
});

var PayItemsSchema = new Entity.SchemaObject({
    EarningsTypes: [EarningTypeSchema],
    BenefitTypes: [BenefitTypeSchema],
    DeductionTypes: [DeductionTypeSchema],
    ReimbursementTypes: [ReimbursementTypeSchema],
    TimeOffTypes: [TimeOffTypeSchema]
});



var PayItems = Entity.extend(PayItemsSchema, {
    constructor: function(application, data, options) {
        logger.debug('PayItems::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        return this._super(options);
    },
    _toObject: function(options) {
        return this._super(options);
    },
    fromXmlObj: function(obj) {
        var self = this;
        Object.assign(self, _.omit(obj, 'BenefitTypes', 'EarningsTypes', 'ReimbursementTypes', 'DeductionTypes', 'TimeOffTypes'));
        if (obj.BenefitTypes) {
            this.extractArray(obj.BenefitTypes.BenefitType, this.BenefitTypes);
        }
        if (obj.EarningsTypes) {
            this.extractArray(obj.EarningsTypes.EarningsType, this.EarningsTypes);
        }
        if (obj.ReimbursementTypes) {
            this.extractArray(obj.ReimbursementTypes.ReimbursementType, this.ReimbursementTypes);
        }
        if (obj.TimeOffTypes) {
            this.extractArray(obj.TimeOffTypes.TimeOffTypes, this.TimeOffTypes);
        }

        if (obj.DeductionTypes) {
            this.extractArray(obj.DeductionTypes.DeductionType, this.DeductionTypes);
        }

        return this;
    },
    toXml: function() {

    }
});


module.exports = PayItems;