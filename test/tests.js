var should = require('should')
    , _ = require('lodash')
    , xero = require('..')
    , util = require('util')

process.on('uncaughtException', function(err)
{
    console.log('uncaught',err)
})

var currentApp;

describe('private application', function ()
{

    describe('create instance', function ()
    {
        it('init instance and set options', function ()
        {
            currentApp = new xero.PrivateApplication({ consumerKey: 'B7LJW1ATAARSDSTRHFLQH7HYZPIQRD', consumerSecret:'NVVMDB2HNIRNICQT0LLAGBEYWWQTHH',
                privateKeyPath:'./cert/private/privatekey.pem'});
        })
    })

    describe.skip('organisations', function()
    {
        it('get', function(done)
        {
            this.timeout(100000);
            currentApp.core.organisations.getOrganisation()
                .then(function(ret)
                {
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
    })
    describe.skip('invoices', function()
    {

        it.skip('get invoice', function (done)
        {
            this.timeout(10000);
            currentApp.core.invoices.getInvoice('4844798d-855a-451d-9e69-07f07596a026')
                .then(function(invoice)
                {
                    console.log(invoice.toObject());
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
        it('update invoice', function (done)
        {
            this.timeout(10000);
            currentApp.core.invoices.getInvoice('4844798d-855a-451d-9e69-07f07596a026')
                .then(function(invoice)
                {
                    invoice.Contact = undefined;
                    invoice.LineItems.push({Description: 'Test',
                        Quantity: 1,
                        UnitAmount: 200,
                        AccountCode: '400'})
                    invoice.save()
                        .then(function()
                        {
                            done();
                        })
                        .fail(function(err)
                        {
                            done(wrapError(err));
                        })

                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })

        it.skip('get invoices', function (done)
        {
            this.timeout(10000);
            currentApp.core.invoices.getInvoices()
                .then(function(invoices)
                {
                    console.log(invoices[0].toObject());
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
        it.skip('create invoice', function(done)
        {
            this.timeout(10000);
            var invoice = currentApp.core.invoices.newInvoice({
                Type: 'ACCREC',
                Contact: {
                    Name: 'Department of Finance'
                },
                DueDate: '2014-10-01',
                LineItems: [
                    {
                        Description: 'Services',
                        Quantity: 4,
                        UnitAmount: 100,
                        AccountCode: '400'
                    }
                ],
                Status: 'AUTHORISED'
            });
            invoice.save()
                .then(function()
                {
                    done();
                })
                .fail(function(err)
                {
                    console.log(util.inspect(err,null,null));
                    done(wrapError(err));
                })


        })
    })
    describe('tracking categories', function()
    {

    })
    describe.skip('payitems', function()
    {
        it('get payitems', function(done)
        {
            this.timeout(10000);
            currentApp.payroll.payitems.getPayItems()
                .then(function(payitems)
                {
                    console.log(payitems[0].EarningsTypes);
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
    })
    describe('timesheets', function()
    {
        it('create timesheet', function(done)
        {
            this.timeout(10000);
            var timesheet = currentApp.payroll.timesheets.newTimesheet({
                EmployeeID: '065a115c-ba9c-4c03-b8e3-44c551ed8f21',
                StartDate: new Date(2014,8,23),
                EndDate: new Date(2014,8,29),
                Status: 'Draft',
                TimesheetLines: [ { EarningTypeID: '',
                    NumberOfUnits: [5,0,0,0,0,0,0]}]
            });
            timesheet.save()
                .then(function()
                {
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })

        })
        it.skip('get timesheets', function(done)
        {
            this.timeout(10000);
            currentApp.payroll.timesheets.getTimesheets()
                .then(function(timesheets)
                {
                    if (!_.isEmpty(timesheets))
                        console.log(util.inspect(timesheets[0].toObject(), null,null));
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
    })

    describe.skip('employees', function()
    {
        var employee;
        it('get (no paging)', function(done)
        {
            this.timeout(10000);
            currentApp.payroll.employees.getEmployees()
                .then(function(ret)
                {
                    console.log(ret[0].toObject());
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
        it.skip('get by id', function(done)
        {
            this.timeout(10000);
            currentApp.payroll.employees.getEmployee('065a115c-ba9c-4c03-b8e3-44c551ed8f21')
                .then(function(ret)
                {
                    employee = ret;
                    console.log(employee.toObject());
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })


    })
    describe.skip('contacts', function()
    {
        var contact;
        it('get by id', function(done)
        {
            this.timeout(10000);
            currentApp.core.contacts.getContact('891F1925-61E6-4955-ADF2-D87366D99DA4')
                .then(function(ret)
                {
                    contact = ret;
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
        it('get (no paging)', function(done)
        {
            this.timeout(10000);
            currentApp.core.contacts.getContacts()
                .then(function(ret)
                {
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
        it('get (paging)', function(done)
        {
            this.timeout(10000);
            currentApp.core.contacts.getContacts({ pager: {start:1, callback:onContacts}})
                .fail(function(err)
                {
                    done(wrapError(err));
                })

            function onContacts(err, response, cb)
            {
                cb();
                try
                {
                    // response.data.length.should.equal(7,'Unexpected number of contacts returned');
                    if (response.finished)
                        done();
                }
                catch(ex)
                {

                    done(ex);
                    return;
                }

            }
        })
        it('get - modifiedAfter', function(done)
        {
            this.timeout(100000);
            var modifiedAfter = new Date();
            currentApp.core.contacts.getContacts({ modifiedAfter: modifiedAfter })
                .then(function(contacts)
                {
                    _.each(contacts,  function(contact)
                    {
                        contact.UpdatedDateUTC.should.be.above(modifiedAfter);
                    })
                    done();

                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })

        })
        it('update contact', function(done)
        {
            this.timeout(10000);
            // Previously retrieved contact
            contact.FirstName = 'Jimbo';
            contact.save()
                .then(function()
                {
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
        it('create single contact', function(done)
        {
            this.timeout(10000);
            var contact = currentApp.core.contacts.newContact({ Name: 'xemware' + Math.random(),FirstName:'Tim',LastName:'Shnaider'});
            contact.save()
                .then(function(ret)
                {
                    console.log(ret);
                    done();
                })
                .fail(function(err)
                {
                    console.log(err)
                    done(wrapError(err));
                })
        })
        it('create multiple contacts', function(done)
        {
            this.timeout(10000);
            var contacts = [];
            contacts.push(currentApp.core.contacts.newContact({ Name: 'xemware' + Math.random(),FirstName:'Tim' + Math.random(),LastName:'Shnaider'}));
            contacts.push(currentApp.core.contacts.newContact({ Name: 'xemware' + Math.random(),FirstName:'Tim' + Math.random(),LastName:'Shnaider'}));
            currentApp.core.contacts.saveContacts(contacts)
                .then(function(ret)
                {
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
        it.skip('get attachments for contacts', function(done)
        {
            this.timeout(100000);
            contact.getAttachments()
                .then(function(attachments)
                {
                    console.log(attachments);
                    done();
                })
                .fail(function(err)
                {
                    console.log(err);
                    done(wrapError(err));
                })
        });
    })

    describe('bank transactions', function()
    {
        it.skip('get by id', function(done)
        {
            this.timeout(10000);
            currentApp.core.bankTransactions.getBankTransaction('63d47b99-e1ef-4b46-84db-034f2205f8fb')
                .then(function(ret)
                {
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })
        it.skip('get (no paging)', function(done)
        {
            this.timeout(10000);
            currentApp.core.bankTransactions.getBankTransactions()
                .then(function(ret)
                {
                    done();
                })
                .fail(function(err)
                {
                    done(wrapError(err));
                })
        })

    });

    describe('journals', function()
    {
        it.skip('get (paging)', function(done)
        {
            this.timeout(10000);
            currentApp.core.journals.getJournals({ pager: {start:1, callback:onJournals}})
                .fail(function(err)
                {
                    done(wrapError(err));
                })

            var recordCount = 0;
            function onJournals(err, ret, cb)
            {
                cb();
                recordCount += ret.data.length;
                var firstRecord = _.first(ret.data);
                if (firstRecord)
                    console.log(util.inspect(firstRecord.toObject(),null,null))
                try
                {

                    if (ret.finished)
                    {
                        console.log('Journals record count:' + recordCount)
                        done();
                    }
                }
                catch(ex)
                {
                    done(ex);
                    return;
                }

            }
        })

    });
});

function wrapError(err)
{
    if (err instanceof Error)
        return err;
    else if (err.statusCode)
        return new Error(err.statusCode + ': ' + err.exception.Message);
}